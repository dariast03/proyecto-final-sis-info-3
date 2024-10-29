import { motion } from "framer-motion";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Sistema de Registro de Asociados
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Gestiona asociados, cuotas y oportunidades laborales.
        </div>

        <Button asChild>
          <Link to="/auth/login">AUTH</Link>
        </Button>

        {/*  <Button asChild>
          <Link to="/admin/dashboard">ADMIN</Link>
        </Button>
        <Button asChild>
          <Link to="/asociado/dashboard">ASOCIADO</Link>
        </Button>
        <Button asChild>
          <Link to="/empresa/dashboard">EMPRESA</Link>
        </Button> */}
      </motion.div>
    </AuroraBackground>
  );
}
