import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'

export interface Block {
  timestamp: string;
  transactions: Transaction[];
}

export interface Transaction {
  timestamp: string;
  fee: number | string;
  type: number;
  transfers: Transfer[]
  amount: number;
  totalAmount: number;
}

export interface Transfer {
  amount: number;
}

export interface VueGlobalFunctions {
  $axios: NuxtAxiosInstance
}

interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  $get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  $delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  $head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  $options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}
