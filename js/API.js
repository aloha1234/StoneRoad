import { Alert, AsyncStorage } from "react-native";

const API_ROOT = "https://stoneroadrewards.com/api/v1";

let key;
loadKey();

let auctionArray = [];

async function loadKey() {
	try {
		const value = await AsyncStorage.getItem("@API:key");
		if (value !== null) {
			key = value;
		}
	} catch (error) {
		console.log("Error loading key", error);
	}
}

function locations(cb) {
	call("locations/", "GET", null, cb);
}

function bid(item, bid, cb) {
	call(
		"bidding_rewards/" + item + "/bid/",
		"POST",
		JSON.stringify({ bid: bid }),
		cb
	);
}

function auctions(cb) {
	auctionArray = [];

	getAllAuctions(1, (err, allActions) => {
		cb(err, allActions);
	});
}

function getAllAuctions(page, cb) {
	call("bidding_rewards/?page=" + page, "GET", null, (err, res) => {
		if (err) {
		} else {
			auctionArray.push(...res.results);
			if (res.next != null) {
				getAllAuctions(page + 1, cb);
			} else {
				cb(null, auctionArray);
			}
		}
	});
}

function user(cb) {
	call("user", "GET", null, cb);
}

function redeem(code, cb) {
	call("packs/", "PATCH", JSON.stringify({ qr_code: code }), cb);
}

function userExists(email, cb) {
	call("user/exists?email=" + email, "GET", null, cb);
}

function register(email, password1, password2, cb) {
	call(
		"register",
		"POST",
		JSON.stringify({ email, password1, password2 }),
		async (err, res) => {
			if (!err) {
				key = res.key;
				try {
					await AsyncStorage.setItem("@API:key", key);
				} catch (error) {
					console.log("Error saving key to storage");
				}
			}
			cb(err, res);
		}
	);
}

function authenticate(email, password, cb) {
	call(
		"authenticate",
		"POST",
		JSON.stringify({ email: email, password: password }),
		async (err, res) => {
			if (!err) {
				key = res.key;
				try {
					await AsyncStorage.setItem("@API:key", key);
				} catch (error) {
					console.log("Error saving key to storage");
				}
			}
			cb(err, res);
		}
	);
}

async function loggedIn(cb) {
	if (key) {
		cb(true);
		return;
	}

	try {
		const value = await AsyncStorage.getItem("@API:key");
		cb(value !== null);
	} catch (error) {
		cb(false);
	}
}

// Wrap this in a promise instead
function call(endpoint, method, body, cb) {
	const headers = key
		? {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Token ${key}`
			}
		: {
				Accept: "application/json",
				"Content-Type": "application/json"
			};

	fetch(`${API_ROOT}/${endpoint}`, {
		method,
		headers,
		body
	})
		.then(res => {
			const { status, _bodyText } = res;
			const body = JSON.parse(_bodyText);
			if (status < 200 || status > 299) {
				cb(
					body.detail ||
						body.non_field_errors ||
						body.password1 ||
						body.password2 ||
						body.email ||
						"Internal system error, please try again later."
				);
			} else {
				cb(null, body);
			}
		})
		.catch(err => {
			cb(err || "Request failed.");
		});
}

export {
	user,
	redeem,
	userExists,
	authenticate,
	loggedIn,
	register,
	auctions,
	bid,
	locations
};
