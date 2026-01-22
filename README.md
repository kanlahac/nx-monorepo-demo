# NX monorepo demo

[English](#english) | [Español](#español)

# English
- [Description](#description)
- [Installation and Usage](#installation-and-Usage)

## Description

This project is a technical demonstration designed to showcase advanced capabilities in the architecture, configuration, and management of an **NX Monorepo**.

The solution is divided into two main projects:

-   **Project A (Main-app):** A **Next.js** application that serves as the system's core. It consumes resources from the internal library and implements custom components based on it.

-   **Project B (Popups):** A **React** library providing a dynamic popup window system. These features include advanced functionalities inspired by the Windows environment: dragging, resizing, maximizing, minimizing, and split view.

**Deployment and CI/CD**  
The continuous integration and deployment (CI/CD) workflow is automated via **GitHub Actions** (`.yml` file), enabling automatic deployment to **GitHub Pages** configured as a Single Page Application (SPA).

## Installation and Usage
This project was built using **Node.js v24.12.0** and **pnpm v10.27.0**.

1. **Clone the repository**.
```sh
git clone https://github.com/kanlahac/nx-monorepo-demo.git
cd nx-monorepo-demo
```
2. **Install dependencies**.
```sh
pnpm install
```
3. **Run the app locally**.
```sh
pnpm nx dev main-app
```
4. **Run unit tests**.
```sh
pnpm nx test main-app
pnpm nx test popups
```
4. **Generate production build**.
```sh
pnpm nx build main-app
```

# Español
- [Descripción](#descripcion)
- [Instalación y uso](#instalación-y-uso)

## Descripción

Este proyecto es una demostración técnica diseñada para exhibir capacidades avanzadas en la arquitectura, configuración y administración de un **monorepositorio con NX**.

La solución se divide en dos proyectos principales:

-   **Proyecto A (Main-app):** Una aplicación desarrollada en **Next.js** que actúa como el núcleo del sistema. Consume los recursos de la librería interna e implementa componentes personalizados basados en ella.

-   **Proyecto B (Popups):** Una librería desarrollada en **React** que provee un sistema de ventanas emergentes dinámicas. Estas cuentan con funcionalidades avanzadas inspiradas en el entorno de Windows: arrastrar, redimensionar (estirar), maximizar, minimizar y dividir (split view).

**Despliegue y CI/CD**  
El flujo de integración y despliegue continuo (CI/CD) está automatizado mediante **GitHub Actions** (archivo `.yml`), permitiendo el despliegue automático del proyecto en **GitHub Pages** como una Single Page Application (SPA).

## Instalación y uso
Este proyecto fue construido con **Node.js v24.12.0** y  **pnpm v10.27.0**.

1. **Clonar el repositorio**.
```sh
git clone https://github.com/kanlahac/nx-monorepo-demo.git
cd nx-monorepo-demo
```
2. **Instalar dependencias**.
```sh
pnpm install
```
3. **Correr la app en local**.
```sh
pnpm nx dev main-app
```
4. **Realizar las pruebas unitarias**.
```sh
pnpm nx test main-app
pnpm nx test popups
```
4. **Generar una build**.
```sh
pnpm nx build main-app
```




