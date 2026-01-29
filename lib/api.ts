'use server';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';
//import { useSession } from 'next-auth/react';



const api = axios.create({
  baseURL: 'https://zuelpay.in/webhook/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Example Request Interceptor
api.interceptors.request.use(async (config) => {
 // const session =  getSession(); // Get the current session
  //const token = getCookie('accessToken');
  const token = await getCookies() ;


  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;




export  async function getCookies(){
  const cookieStore = await cookies();
  //const cookieString = cookieStore.toString();
  const env = process.env.NEXT_PUBLIC_NODE_ENV
 // let sessionToken  =  {  };
  if(env == "development"){
   const  sessionToken = cookieStore.get('next-auth.session-token');

    if (sessionToken) {

      return sessionToken.value;
      // console.log(sessionToken.value);
      // headers.append("Cookie", `next-auth.session-token=${sessionToken}`);
    }

  }
  else if (env == "production"){
    const sessionToken = cookieStore.get('__Secure-next-auth.session-token');

    if (sessionToken) {

      return sessionToken.value;
      // console.log(sessionToken.value);
      // headers.append("Cookie", `next-auth.session-token=${sessionToken}`);
    }

  }


}

export  async function apiRequest(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const { data: session, status } = useSession();

  console.log("working..." );

  const response = await api.get('/app_other/notify?type=CREDIT CARD');
  const data = response.data;

  return data;

  //console.log("working..." +JSON.stringify(data));





}




export async function apiFetch(


input: string | Request,
  init?: RequestInit,
): Promise<Response> {
  let url = input;

  // If input is a string and is a relative API path, prefix with base URL
  if (typeof input === 'string') {
    if (input.startsWith('/api/')) {
      // Remove leading slash to avoid double slashes
      url =
        process.env.NEXT_PUBLIC_BASE_PATH +
        (input.startsWith('/') ? input : '/' + input);
    }
  }
  // If input is a Request object, you could extend logic here if needed


  const session = await getSession(); // Get the current session
  //console.log("url" + JSON.stringify(session));

  const headers = new Headers(init?.headers);

  //console.log(cookieString);
  // 2. Set or Append new headers
  headers.append("Token", ""+JSON.stringify(session));

  //const Cookie= await getCookies();
 // headers.append("Cookie", ""+Cookie);

 // Cookie: (await headers()).get("cookie") || "",

  //headers.append("X-Custom-Header", "MyValue");

  return fetch(url as RequestInfo, {
    ...init,
    headers: headers,
  });
}


