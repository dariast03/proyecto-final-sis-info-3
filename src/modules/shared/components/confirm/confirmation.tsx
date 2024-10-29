import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { confirmable, ConfirmDialogProps } from "react-confirm";

export interface Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const Confirmation: React.FC<ConfirmDialogProps<Props, boolean>> = ({
  title,
  description,
  proceed,
  cancel,
  dismiss,
  show,
}) => (
  <>
    <AlertDialog open={show} onOpenChange={() => proceed(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "Alerta"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? "Estas seguro de realizar esta accion?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => proceed(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => proceed(true)}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
);

export default confirmable(Confirmation);
