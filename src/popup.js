$(document).ready(async () => {
	const options = await getOptions();
	initialize(options);

	$("#save-button").on("click", () => {
		var selectedLanguage = $("#language-select").val();
		var selectedTheme = $("#theme-select").val();

		chrome.storage.sync.set({ language: selectedLanguage, theme: selectedTheme });
	});
});

const getOptions = async () => chrome.storage.sync.get();

const initialize = (options) => {
	$("#language-select").val(options.language ?? "sys");
	$("#theme-select").val(options.theme ?? "sys")
}
