module.exports = function() {
	var config = {
		// All JS used to vet
		alljs: [
			'./app_client/**/*.js',
			'./app_server/**/*.js',
			'./app_api/**/*.js',
			'./*.js'
		]
	};

	return config;

};