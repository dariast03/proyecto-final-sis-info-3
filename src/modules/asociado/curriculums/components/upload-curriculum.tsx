import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Curriculum, curriculumSchema } from "../data/schema";
import {
  useCurriculumCreate,
  useCurriculumUpdate,
} from "../hooks/use-curriculum-mutations";

import { useUploadFile } from "@/hooks/use-upload-file";
import { FileUploader } from "@/components/ui/file-uploader";
import { UploadedFilesCard } from "@/components/custom/uploaded-files-card";
import { confirm } from "@/modules/shared/components/confirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SubjectFormProps {
  initialData?: Curriculum | null;
  onSubmitRedirect?: string;
}

export const UploadCurriculum: React.FC<SubjectFormProps> = ({
  initialData: initial,
  onSubmitRedirect = "/",
}) => {
  const curriculumsCreate = useCurriculumCreate();
  const curriculumsUpdate = useCurriculumUpdate();

  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(initial);

  const initialDataId =
    initialData && "id" in initialData ? initialData.id : null;

  const defaultValues = initialData ? initialData : {};

  const form = useForm<Curriculum>({
    resolver: zodResolver(
      curriculumSchema.omit(initialDataId ? {} : { id: true })
    ),
    defaultValues,
    mode: "all",
  });

  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    {
      clearOnCompleted: true,
      onCompleted: (images) => {
        if (!images.length) return;
        console.log("🚀 ~ images:", images);
        form.setValue("archivo", images[0].name);
      },
    }
  );

  console.log(form.formState.errors);

  const allFilesUpload = uploadedFiles;

  const onSubmit = async (values: Curriculum) => {
    try {
      await curriculumsCreate.mutateAsync(values);
      //onSubmitRedirect && navigate(onSubmitRedirect);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="archivo"
            render={() => (
              <FormItem>
                <FormLabel>Subir Curriculum</FormLabel>
                <FormControl>
                  <>
                    <FileUploader
                      accept={{
                        "image/*": [".jpg", ".jpeg", ".png"],
                        "application/pdf": [".pdf"],
                      }}
                      maxFiles={1}
                      maxSize={4 * 1024 * 1024}
                      progresses={progresses}
                      onUpload={uploadFiles}
                      disabled={isUploading}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {allFilesUpload.length > 0 && (
            <UploadedFilesCard
              uploadedFiles={allFilesUpload}
              onDeleteImage={() => {}}
            />
          )}

          <div className="sticky bottom-0 py-2 bg-white">
            <Button
              className="w-full"
              disabled={curriculumsCreate.isPending}
              //  onClick={nextStep}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
