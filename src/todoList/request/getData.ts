import { headers } from "./config";

const getData = async (url: string) => {
  const response = await fetch(url, { method: 'GET', headers })
	  .then(res => res.json())
	  .then(
	  	res => res,
		  error => error
	  )

	return response
}

export default getData;
