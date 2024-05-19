import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title, location, content, image } = req.body;
  const { data: putData, error: putError } = await supabase
    .from("posts")
    .update([
      {
        id,
        title,
        location,
        content,
        image,
        createdAt: new Date().toISOString(),
      },
    ])
    .eq("id", id);

  if (putError) {
    return res.status(500).json({ error: putError.message });
  }

  return res.status(200).json(putData);
}
