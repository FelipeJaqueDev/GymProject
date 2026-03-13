import GenericNavbar from "@/core/components/Navbar/GenericNavbar"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import * as React from 'react';
import { Input } from "@/components/ui/input"
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "@/components/Footer";
import ShapeDivider from "@/core/components/ShapeDivider/ShapeDivider";
//import { color } from "framer-motion";
//import { Typography } from "@mui/material";
//import { LineShadowText } from "@/components/ui/line-shadow-text"
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Contact() {

  const refLeftTitleText = useRef<HTMLHeadingElement>(null);
  const refLeftDescriptionText = useRef<HTMLHeadingElement>(null);
  const refRightForm = useRef<HTMLObjectElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const { colors } = CoreFitTheme;

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: ""
  })

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.nombre || !form.apellido || !form.telefono || !form.email || !form.mensaje) {
      enqueueSnackbar('Por favor, completa todos los campos', { variant: 'error' });
      return
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      enqueueSnackbar('Por favor ingresa un email válido', { variant: 'error' });
      return
    }

    try {
      handleOpen()
      const res = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        handleClose()
        enqueueSnackbar('Mensaje enviado correctamente', { variant: 'success' });
        setForm({ nombre: "", apellido: "", telefono: "", email: "", mensaje: "" })
      } else {
        handleClose()
        enqueueSnackbar('Error al enviar mensaje', { variant: 'error' });
      }
    } catch (error) {
      handleClose()
      enqueueSnackbar('Error de conexión. Intente nuevamente.', { variant: 'error' });
    }
  }

  useEffect(() => {

    const ctx = gsap.context(() => {

      if (refLeftTitleText.current && refLeftDescriptionText.current && refRightForm.current) {

        gsap.fromTo(
          refLeftTitleText.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 2, ease: "elastic.out" }
        )

        gsap.fromTo(
          refLeftDescriptionText.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 2, delay: 0.3, ease: "elastic.out" }
        )

        gsap.fromTo(
          refRightForm.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 2, delay: 0.6, ease: "elastic.out" }
        )
      }
    }); //fin del context

    return () => ctx.revert(); // IMPORTANTE: Limpia todo si el componente se desmonta

  }, [])


  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center h-[100vh] bg-cover bg-center text-white"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="z-0">
          <ShapeDivider
            //position="bottom" // Esto pone el div contenedor en la parte inferior izquierda
            shape="tilt25DegreeLeft" // Usamos la nueva forma
            color={colors.background}
            height="100vh" // Establecer una altura que cubra el contenedor
            flipY
          // No usamos flipX/flipY internos, ya que el transform se aplicará al div contenedor
          />
        </div>
        <GenericNavbar />

        <div className="grid grid-cols-12 gap-34 w-full px-5 z-10">

          <div className="col-span-6 flex flex-col items-center px-20 pt-20">
            <h1 ref={refLeftTitleText} className="text-5xl md:text-6xl font-extrabold mb-4" style={{ color: colors.text }}>
              ¡Hablemos!
            </h1>
            <p ref={refLeftDescriptionText} style={{ marginTop: 25, fontSize: 16, color: colors.text }}>
              En CoreFit estamos listos para resolver todas tus dudas sobre membresías,
              clases y planes de entrenamiento. Completa el formulario y un miembro de nuestro
              equipo se comunicará contigo a la brevedad.
            </p>
          </div>

          <div ref={refRightForm} className="col-span-6 text-white w-full px-15">
            <FieldSet className="w-full">
              <FieldLegend
                style={{ color: colors.text }}
                className="w-full text-center block"
              >
                {/* <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                  Escríbenos
                </h1> */}
              </FieldLegend>

              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="nombre" style={{ color: colors.text }}>
                      Nombre
                    </FieldLabel>
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Nombre*"
                      style={{ color: colors.text }}
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="apellido" style={{ color: colors.text }}>
                      Apellido
                    </FieldLabel>
                    <Input
                      id="apellido"
                      type="text"
                      placeholder="Apellido*"
                      style={{ color: colors.text }}
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="telefono" style={{ color: colors.text }}>
                      Teléfono
                    </FieldLabel>
                    <Input
                      id="telefono"
                      type="text"
                      placeholder="Teléfono*"
                      style={{ color: colors.text }}
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email" style={{ color: colors.text }}>
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email*"
                      style={{ color: colors.text }}
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </div>

                <Textarea
                  className="text-white"
                  placeholder="Escribe tu mensaje*"
                  name="mensaje"
                  rows={4}
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  style={{
                    background: colors.secondary,
                    color: colors.text
                  }}
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
                <Backdrop
                  sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 2 })}
                  open={open}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </FieldGroup>
            </FieldSet>
          </div>
        </div>
      </section>
      <Footer />
    </>


  )
}

export default Contact