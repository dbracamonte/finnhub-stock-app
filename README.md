# Finnhub Stock App

![home](https://github.com/user-attachments/assets/1e3d4ec7-8aaa-4ac0-9c4d-adbfb67b3022) ![charts](https://github.com/user-attachments/assets/5304ecb9-302f-43c3-9bd4-ffba44a8a7f1) ![config](https://github.com/user-attachments/assets/1c88acea-9683-4063-86c5-be662d8e0132)

## Descripción

Esta aplicación de React Native muestra datos de acciones en tiempo real utilizando la API de Finnhub Stock.

La aplicación tiene tres pantallas principales:

1. **Añadir alerta**: Un formulario con dos campos, un menú desplegable para seleccionar una acción y un campo de entrada para el precio de alerta.
2. **Lista de vigilancia**: Muestra las acciones como tarjetas, mostrando el nombre, el valor y el cambio marginal en porcentaje.
3. **Gráfico**: Grafica el valor de todas las acciones vigiladas en valor en dólares.

## Requisitos

- Node.js (versión 16 o superior)
- Expo CLI (puedes instalarlo globalmente con `npm install -g expo-cli`)

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/dbracamonte/finnhub-stock-app
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd finnhub-stock-app
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Ejecutar aplicación:

    en iOS:
    ```bash
    npm run ios
    ```
    en Android:
    ```bash
    npm run android
    ```

## Configuración

Necesitarás una API Key de Finnhub para obtener datos de acciones en tiempo real. Regístrate en [Finnhub](https://finnhub.io/) para obtener una API Key gratuita y luego crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
EXPO_PUBLIC_API_BASE_URL=https://finnhub.io/api/v1
EXPO_PUBLIC_API_KEY=api_key_aqui
