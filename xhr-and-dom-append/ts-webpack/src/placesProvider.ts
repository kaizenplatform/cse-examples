import axios from "axios";

export interface ApiRes {
  success: boolean;
  error?: string;
  places?: Places;
}

export type Places = Place[];

interface Place {
  id: string;
  name: string;
  country: string;
  image: string;
  googleMap: string;
}

const urls = {
  hit:
    "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places.json?20200910",
  // API response 0 件パターン
  zeroHit:
    "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places-zero.json?20200910",
  // API error response パターン
  error:
    "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places-fail.json?20200910",
};

// Kaizen Web API からコンテンツを取得
export const loadPlaces = async (): Promise<Places> => {
  const r: ApiRes = (await axios.get(urls.hit)).data; // or urls.zeroHit or urls.error
  console.log("xhr done", r);

  if (!r.success) throw new Error(r.error);
  return r.places || [];
};
