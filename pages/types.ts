import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'

export interface Block {
  timestamp: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  timestamp: number;
  fee: number | string;
  type: number;
  transfers: Transfer[];
  data?: { key: string; type: string; value: string | number | boolean }[];
  amount: number;
  totalAmount: number;
  height: number;
  sender: string;
  recipient?: string;
  effectiveFee: number;
  effectiveSponsor?: string;
  proofs: string[];
}

export interface Transfer {
  amount: number;
  recipient: string;
}

export interface VueGlobalFunctions {
  $axios: NuxtAxiosInstance;
}

interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  $get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}
