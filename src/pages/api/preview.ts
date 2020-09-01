import { NextApiRequest, NextApiResponse } from 'next'
import { previewHandler } from 'next-tinacms-github'

export default function (req: NextApiRequest, res: NextApiResponse) {
  let body = req.body;

  if (typeof req.body === "string" && req.method === "POST") {
    body = JSON.parse(body);
  }

  if (req.body["cdm_head_branch"] && req.method === "POST") {
    res.setPreviewData({
      head_branch: req.body["cdm_head_branch"]
    });
  }
  
  return previewHandler(req, res);
}