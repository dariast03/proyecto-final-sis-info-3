import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
  code?: React.ReactNode
  message?: React.ReactNode
}

export default function GeneralError({
  className,
  minimal = false,
  code = 500,
  message = (
    <>
      Disculpanos las molestias. <br /> Por favor, inténtalo de nuevo más tarde.{' '}
      <br /> Si el problema persiste, contacta con soporte técnico.
    </>
  ),
}: GeneralErrorProps) {
  const navigate = useNavigate()
  return (
    <div className={cn('h-dvh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>{code}</h1>
        )}
        <span className='font-medium'>Ups. Algo salio mal {`:')`}</span>
        <p className='text-center text-muted-foreground'>{message}</p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Volver Atras
            </Button>
            <Button onClick={() => navigate('/')}>Ir al Inicio</Button>
          </div>
        )}
      </div>
    </div>
  )
}
