
import { getError } from "@/lib/get-error";

import * as React from "react";
import { toast } from "react-hot-toast";

type Resource = {
  hello: string;
}


interface UseUploadFileProps {
  storage?: "images";
  onCompleted?: (data: File[]) => void;
  clearOnCompleted?: boolean;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useUploadFile(
  { storage = "images", onCompleted, clearOnCompleted }: UseUploadFileProps = {
    storage: "images",
    clearOnCompleted: false,
  }
) {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  async function uploadFiles(files: File[]) {
    setIsUploading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    clearOnCompleted && setUploadedFiles([]);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          let progress = 0;

          const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 50) + 1;
            progress = Math.min(progress, 100);
            setProgresses((prev) => {
              return {
                ...prev,
                [file.name]: progress,
              };
            });
          }, 500);

          await sleep(2000);

          const uploadedFile = file

          clearInterval(interval);

          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: 100,
            };
          });

          return uploadedFile;
        })
      );

      setUploadedFiles((prev) => [...prev, ...uploaded]);
      onCompleted?.(uploaded);

      //     toast.success("Archivos subidos correctamente!");
    } catch (err: any) {
      toast.error(getError(err).msg);
    } finally {
      setIsUploading(false);
      setProgresses({});
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles,
    isUploading,
  };
}
