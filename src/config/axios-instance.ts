import axios from 'axios'
import { parseISO } from 'date-fns';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5091',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsImV4cCI6MTc0NTg4Njk0NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwOC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDA4LyJ9.f3pjVpukzfP-kbg1VmHcp31syHhX0phajgPWPWDYjCY'
    },
})

const isoDateFormat =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
        return body;

    for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) body[key] = parseISO(value);
        else if (typeof value === "object") handleDates(value);
    }
}

axiosInstance.interceptors.request.use(
    (config) => {
        /*   const { token } = useAuthStore.getState();
  
          if (token) {
              config.headers["Authorization"] = `Bearer ${token}`;
          } */

        return config;
    },
    (error) => {
        console.log({
            msg: "error",
            error,
        });

        console.log(error?.code);
        if (error?.code === "ERR_NETWORK") {
            console.log("XDD");
            throw new Error(
                "Error de conexión. Si el error persiste contacta con un administrador"
            );
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use((originalResponse) => {
    handleDates(originalResponse.data);
    return originalResponse;
});

axiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        /*  if (error?.code === "ERR_NETWORK") {
             throw new Error(
                 "Ups. Algo salio mal, si el error persiste contacte con un administrador"
             );
         }
 
         if (error?.response?.status == 401) {
             console.log("BORRAR TOKEN authStore");
             useAuthStore.getState().setLogout();
         } else if (error?.response?.status == 500) {
             toast.error(
                 "Ups. Algo salio mal, si el error persiste contacte con un administrador"
             );
         } */

        return Promise.reject(error);
    }
);


export default axiosInstance