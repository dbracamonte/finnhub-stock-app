import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type TMethod = "get" | "post" | "put" | "delete";

interface IApiParams {
	url: string;
	method?: TMethod;
}

const TIMEOUT_FETCH = 180000;
let BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
let API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? "";

const api = async ({ url, method }: IApiParams): Promise<AxiosResponse> => {
	if (BASE_URL.endsWith("/")) {
		BASE_URL = BASE_URL.slice(0, -1);
	}

	if (url.startsWith("/")) {
		url = url.slice(1);
	}

	const axiosParameters: AxiosRequestConfig = {
		url: `${BASE_URL}/${url}&token=${API_KEY}`,
		method: method,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		timeout: TIMEOUT_FETCH,
	};

	return new Promise(function (resolve, reject) {
		axios(axiosParameters)
			.then(function (response) {
				resolve(response);
			})
			.catch(function (error) {
				reject(error.response.data);
				reportError(error);
			});
	});
};

export const get = ({ url }: IApiParams): Promise<AxiosResponse> => {
	return api({ url, method: "get" });
};
