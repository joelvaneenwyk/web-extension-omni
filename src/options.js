$(document).ready(() => {
	console.log("loaded");
	$("#save-button").on("click", () => {
		var selectedLanguage = $("#language-select").val();
		chrome.storage.sync.set({ language: selectedLanguage }, () => {
			console.log("Language preference saved.");
		});
	});
});
