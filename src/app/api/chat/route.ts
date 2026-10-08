import { chatSchema } from "@/lib/validation";
import { makeDemoReply } from "@/lib/demo";
import type { Message } from "@/types/domain";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BYTES = 8192;

// Count actual bytes: Content-Length can be missing or dishonest.
async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      throw new Error("too-large");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { error: "Cross-origin requests are not allowed." },
      { status: 403 },
    );
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return Response.json({ error: "Send application/json." }, { status: 415 });
  let body: unknown;
  try {
    body = JSON.parse(await readBody(request));
  } catch (error) {
    return Response.json(
      { error: "Invalid or oversized request." },
      {
        status:
          error instanceof Error && error.message === "too-large" ? 413 : 400,
      },
    );
  }
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success)
    return Response.json(
      { error: "Enter a question of 1–1,000 characters and a valid scenario." },
      { status: 400 },
    );
  const message: Message = {
    id: crypto.randomUUID(),
    ...makeDemoReply(parsed.data.message, parsed.data.scenario),
  };
  return Response.json(
    { message },
    { headers: { "Cache-Control": "no-store" } },
  );
}
