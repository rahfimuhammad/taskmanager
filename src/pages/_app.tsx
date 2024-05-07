import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import TaskProvider from "@/context/TaskProvider";
import AuthProvider from "@/context/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider session={undefined} setSession={function (value: any): void {
                          throw new Error("Function not implemented.");
                        } } register={function (data: any): void {
                          throw new Error("Function not implemented.");
                        } } login={function (data: any): void {
                          throw new Error("Function not implemented.");
                        } }
      >
        <TaskProvider task={undefined} setTask={function (value: any): void {
                            throw new Error("Function not implemented.");
                          } } getTasks={function (): void {
                            throw new Error("Function not implemented.");
                          } } createTask={function (data: any): void {
                            throw new Error("Function not implemented.");
                          } } updateTask={function (data: any): void {
                            throw new Error("Function not implemented.");
                          } } loading={false} deleteTask={function (taskId: any): void {
                            throw new Error("Function not implemented.");
                          } }              
          >
            <Component {...pageProps} />   
          </TaskProvider>
      </AuthProvider>
    </ChakraProvider>
  
  )
}
