export default function checkToken({ redirect, req, res, route }){
	if (process.server) {
		return
	}

	var token = localStorage.getItem('jwt_token')
	if(token)
	{
		return
	}
	else
	{
		return redirect('/')
	}
}
