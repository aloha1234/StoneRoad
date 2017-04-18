import { Alert, AsyncStorage } from 'react-native'

const API_ROOT = 'https://stoneroadrewards.com/api/v1'

let key;

function loadKey() {
}

loadKey()


function user(onComplete) {
	call('user', 'GET', null, onComplete)
}

function redeem(code, cb) {
	call('packs/', 'PATCH', JSON.stringify({ qr_code: code}), cb)
}

function userExists(email, cb) {
	call('user/exists?email='+email, 'GET', null, cb)
}

function register(email, password1, password2, cb) {
	call('register', 'POST', JSON.stringify({ email, password1, password2 }), (err, res) => {
		if (!err) {
			key = res.key
		}
		cb(err, res)
	})
}

function authenticate(email, password, cb) {
	call('authenticate', 'POST', JSON.stringify({ email: email, password: password }), (err, res) => {
		if (!err) {
			key = res.key
		}
		cb(err, res)
	})
}

function loggedIn() {
	return !!key
}

// Wrap this in a promise instead
function call(endpoint, method, body, cb) {

	const headers = key ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Token ${key}`
  }
  :
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

	fetch(`${API_ROOT}/${endpoint}`, {
		method,
		headers,
	  body
	}).then((res) => {
		const { status, _bodyText } = res
		const body = JSON.parse(_bodyText)
		if (status < 200 || status > 299) {
			console.log(body.password1)
			cb(body.detail || body.non_field_errors || body.password1 || body.password2 || body.email || 'Internal system error, please try again later.')
		} else {
			cb(null, body)
		}
	}).catch((err) => {
		cb(err || 'Request failed.')
	})
}

export { user, redeem, userExists, authenticate, loggedIn, register }