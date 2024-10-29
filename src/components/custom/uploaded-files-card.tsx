/* import { type ClientUploadedFileData } from "uploadthing/types"

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

import type { UploadedFile } from "@/types" */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "@/components/custom/empty-card";
import { Image } from "../ui/image";
import { File, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface UploadedFilesCardProps {
  uploadedFiles: File[];
  onDeleteImage?: (id: string) => void;
}

export function UploadedFilesCard({
  uploadedFiles,
  onDeleteImage,
}: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Archivos Subidos</CardTitle>
        <CardDescription>Mira los archivos subidos aqui</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => (
                <div key={file.name} className="relative aspect-video">
                  {file?.type?.includes("image") ? (
                    <Image
                      src={"#"}
                      alt={file.name}
                      preview
                      /* fill
                     sizes="(min-width: 640px) 640px, 100vw" */
                      /*   loading="lazy" */
                      className="rounded-md object-contain size-40"
                    />
                  ) : (
                    <a
                      href={"#"}
                      rel="noreferrer"
                      target="_blank"
                      className="border rounded-xl size-40 grid place-items-center"
                    >
                      <File className="size-16" />
                      <span className="text-xs text-center">{file.name}</span>
                    </a>
                  )}
                  {/* DELETE RESOURCE */}

                  <div className="absolute top-0 right-0">
                    <Button
                      size="icon"
                      type="button"
                      variant={"ghost"}
                      className="size-8 text-destructive hover:text-destructive"
                      //  onClick={() => onDeleteImage?.(file.id)}
                      /* onClick={() => handleDeleteResource(file.id)} */
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No se subieron archivos"
            description="Sube algunos archivos para verlos aquí."
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
