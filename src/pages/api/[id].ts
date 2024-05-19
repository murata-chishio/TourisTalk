import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!data) {
        notFound();
      }

      return res.status(200).json(data);

    case "DELETE":
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteError) {
        return res.status(500).json({ message: deleteError.message });
      }
      return res.status(500).json({ message: "削除に成功しました。" });

    case "PUT":
      const { title, location, content, image } = req.body;
      const { data: putData, error: putError } = await supabase
        .from("posts")
        .update([
          {
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
}
