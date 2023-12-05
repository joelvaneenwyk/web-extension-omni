let actions = [];
let newtaburl = "";

// Clear actions and append default ones
const clearActions = () => {
	getCurrentTab().then((response) => {
		actions = [];
		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		let muteaction = {title: "mute_tab_title", desc: "mute_tab_desc", type:"action", action:"mute", emoji:true, emojiChar:"🔇", keycheck:true, keys:['⌥','⇧', 'M']};
		let pinaction = {title: "pin_tab_title", desc: "pin_tab_desc", type:"action", action:"pin", emoji:true, emojiChar:"📌", keycheck:true, keys:['⌥','⇧', 'P']};
		if (response.mutedInfo.muted) {
			muteaction = {title: "unmute_tab_title", desc: "unmute_tab_desc", type:"action", action:"unmute", emoji:true, emojiChar:"🔈", keycheck:true, keys:['⌥','⇧', 'M']};
		}
		if (response.pinned) {
			pinaction = {title: "unpin_tab_title", desc: "unpin_tab_dec", type:"action", action:"unpin", emoji:true, emojiChar:"📌", keycheck:true, keys:['⌥','⇧', 'P']};
		}
		actions = [
			{title: "new_tab_title", desc: "new_tab_desc", type:"action", action:"new-tab", emoji:true, emojiChar:"✨", keycheck:true, keys:['⌘','T']},
			{title: "bookmark_title", desc: "bookmark_desc", type:"action", action:"create-bookmark", emoji:true, emojiChar:"📕", keycheck:true, keys:['⌘','D']},
			pinaction,
			{title: "fullscreen_title", desc: "fullscreen_desc", type:"action", action:"fullscreen", emoji:true, emojiChar:"🖥", keycheck:true, keys:['⌘', 'Ctrl', 'F']},
			muteaction,
			{title: "reload_title", desc: "reload_desc", type:"action", action:"reload", emoji:true, emojiChar:"♻️", keycheck:true, keys:['⌘','⇧', 'R']},
			{title: "help_title", desc: "help_desc", type:"action", action:"url", url:"https://github.com/alyssaxuu/omni", emoji:true, emojiChar:"🤔", keycheck:false},
			{title: "compose_email_title", desc: "compose_email_desc", type:"action", action:"email", emoji:true, emojiChar:"✉️", keycheck:true, keys:['⌥','⇧', 'C']},
			{title: "print_page_title", desc: "print_page_desc", type:"action", action:"print", emoji:true, emojiChar:"🖨️", keycheck:true, keys:['⌘', 'P']},
			{title: "new_notion_page_title", desc: "new_notion_page_desc", type:"action", action:"url", url:"https://notion.new", emoji:false, favIconUrl:chrome.runtime.getURL("assets/logo-notion.png"), keycheck:false},
			{title: "new_sheets_spreadsheet_title", desc: "new_sheets_spreadsheet_desc", type:"action", action:"url", url:"https://sheets.new", emoji:false, favIconUrl:chrome.runtime.getURL("assets/logo-sheets.png"), keycheck:false},
			{title: "new_docs_document_title", desc: "new_docs_document_desc", type:"action", action:"url", emoji:false, url:"https://docs.new", favIconUrl:chrome.runtime.getURL("assets/logo-docs.png"), keycheck:false},
			{title: "new_slides_presentation_title", desc: "new_slides_presentation_desc", type:"action", action:"url", url:"https://slides.new", emoji:false, favIconUrl:chrome.runtime.getURL("assets/logo-slides.png"), keycheck:false},
			{title: "new_form_title", desc: "new_form_desc", type:"action", action:"url", url:"https://forms.new", emoji:false, favIconUrl:chrome.runtime.getURL("assets/logo-forms.png"), keycheck:false},
			{title: "new_medium_story_title", desc: "new_medium_story_desc", type:"action", action:"url", url:"https://story.new", emoji:false, favIconUrl:chrome.runtime.getURL("assets/logo-medium.png"), keycheck:false},
			{title: "new_github_repository_title", desc: "new_github_repository_desc", type: "action", action: "url", url: "https://github.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-github.png"), keycheck: false},
			{title: "new_github_gist_title", desc: "new_github_gist_desc", type: "action", action: "url", url: "https://gist.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-github.png"), keycheck: false},
			{title: "new_codepen_pen_title", desc: "new_codepen_pen_desc", type: "action", action: "url", url: "https://pen.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-codepen.png"), keycheck: false},
			{title: "new_excel_spreadsheet_title", desc: "new_excel_spreadsheet_desc", type: "action", action: "url", url: "https://excel.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-excel.png"), keycheck: false},
			{title: "new_powerpoint_presentation_title", desc: "new_powerpoint_presentation_desc", type: "action", action: "url", url: "https://powerpoint.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-powerpoint.png"), keycheck: false},
			{title: "new_word_document_title", desc: "new_word_document_desc", type: "action", action: "url", url: "https://word.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-word.png"), keycheck: false},
			{title: "create_a_whiteboard_title", desc: "create_a_whiteboard_desc", type: "action", action: "url", url: "https://whiteboard.new", emoji: true, emojiChar: "🧑‍🏫", keycheck: false},
			{title: "record_a_video_title", desc: "record_a_video_desc", type: "action", action: "url", url: "https://recording.new", emoji: true, emojiChar: "📹", keycheck: false},
			{title: "create_a_figma_file_title", desc: "create_a_figma_file_desc", type: "action", action: "url", url: "https://figma.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-figma.png"), keycheck: false},
			{title: "create_a_figjam_file_title", desc: "create_a_figjam_file_desc", type: "action", action: "url", url: "https://figjam.new", emoji: true, emojiChar: "🖌", keycheck: false},
			{title: "hunt_a_product_title", desc: "hunt_a_product_desc", type: "action", action: "url", url: "https://www.producthunt.com/posts/new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-producthunt.png"), keycheck: false},
			{title: "make_a_tweet_title", desc: "make_a_tweet_desc", type: "action", action: "url", url: "https://twitter.com/intent/tweet", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-twitter.png"), keycheck: false},
			{title: "create_a_playlist_title", desc: "create_a_playlist_desc", type: "action", action: "url", url: "https://playlist.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-spotify.png"), keycheck: false},
			{title: "create_a_canva_design_title", desc: "create_a_canva_design_desc", type: "action", action: "url", url: "https://design.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-canva.png"), keycheck: false},
			{title: "create_a_new_podcast_episode_title", desc: "create_a_new_podcast_episode_desc", type: "action", action: "url", url: "https://episode.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-anchor.png"), keycheck: false},
			{title: "edit_an_image_title", desc: "edit_an_image_desc", type: "action", action: "url", url: "https://photo.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-photoshop.png"), keycheck: false},
			{title: "convert_to_pdf_title", desc: "convert_to_pdf_desc", type: "action", action: "url", url: "https://pdf.new", emoji: true, emojiChar: "📄", keycheck: false},
			{title: "scan_a_qr_code_title", desc: "scan_a_qr_code_desc", type: "action", action: "url", url: "https://scan.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-qr.png"), keycheck: false},
			{title: "add_a_task_to_asana_title", desc: "add_a_task_to_asana_desc", type: "action", action: "url", url: "https://task.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-asana.png"), keycheck: false},
			{title: "add_an_issue_to_linear_title", desc: "add_an_issue_to_linear_desc", type: "action", action: "url", url: "https://linear.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-linear.png"), keycheck: false},
			{title: "add_a_task_to_wip_title", desc: "add_a_task_to_wip_desc", type: "action", action: "url", url: "https://todo.new", emoji: false, favIconUrl: chrome.runtime.getURL("assets/logo-wip.png"), keycheck: false},
			{title: "add_a_note_title", desc:"add_a_note_desc", type:"action", action:"url", emoji:false, url:"https://note.new", favIconUrl:chrome.runtime.getURL("assets/logo-keep.png"), keycheck:false},
			{title: "new_meeting_title", desc:"new_meeting_desc", type:"action", action:"url", emoji:false, url:"https://meet.new", favIconUrl:chrome.runtime.getURL("assets/logo-meet.png"), keycheck:false},
			{title: "browsing_history_title", desc:"browsing_history_desc", type:"action", action:"history", emoji:true, emojiChar:"🗂", keycheck:true, keys:['⌘','Y']},
			{title: "incognito_mode_title", desc:"incognito_mode_desc", type:"action", action:"incognito", emoji:true, emojiChar:"🕵️", keycheck:true, keys:['⌘','⇧', 'N']},
			{title: "downloads_title", desc:"downloads_desc", type:"action", action:"downloads", emoji:true, emojiChar:"📦", keycheck:true, keys:['⌘','⇧', 'J']},
			{title: "extensions_title", desc:"extensions_desc", type:"action", action:"extensions", emoji:true, emojiChar:"🧩", keycheck:false, keys:['⌘','D']},
			{title: "chrome_settings_title", desc:"chrome_settings_desc", type:"action", action:"settings", emoji:true, emojiChar:"⚙️", keycheck:true, keys:['⌘',',']},
			{title: "scroll_to_bottom_title", desc:"scroll_to_bottom_desc", type:"action", action:"scroll-bottom", emoji:true, emojiChar:"👇", keycheck:true, keys:['⌘','↓']},
			{title: "scroll_to_top_title", desc:"scroll_to_top_desc", type:"action", action:"scroll-top", emoji:true, emojiChar:"👆", keycheck:true, keys:['⌘','↑']},
			{title: "go_back_title", desc:"go_back_desc", type:"action", action:"go-back", emoji:true, emojiChar:"👈", keycheck:true, keys:['⌘','←']},
			{title: "go_forward_title", desc: "go_forward_desc", type: "action", action: "go-forward", emoji: true, emojiChar: "👉", keycheck: true, keys: ['⌘', '→']},
			{title: "duplicate_tab_title", desc: "duplicate_tab_desc", type: "action", action: "duplicate-tab", emoji: true, emojiChar: "📋", keycheck: true, keys: ['⌥', '⇧', 'D']},
			{title: "close_tab_title", desc: "close_tab_desc", type: "action", action: "close-tab", emoji: true, emojiChar: "🗑", keycheck: true, keys: ['⌘', 'W']},
			{title: "close_window_title", desc: "close_window_desc", type: "action", action: "close-window", emoji: true, emojiChar: "💥", keycheck: true, keys: ['⌘', '⇧', 'W']},
			{title: "manage_browsing_data_title", desc: "manage_browsing_data_desc", type: "action", action: "manage-data", emoji: true, emojiChar: "🔬", keycheck: true, keys: ['⌘', '⇧', 'Delete']},
			{title: "clear_all_browsing_data_title", desc: "clear_all_browsing_data_desc", type: "action", action: "remove-all", emoji: true, emojiChar: "🧹", keycheck: false, keys: ['⌘', 'D']},
			{title: "clear_browsing_history_title", desc: "clear_browsing_history_desc", type: "action", action: "remove-history", emoji: true, emojiChar: "🗂", keycheck: false, keys: ['⌘', 'D']},
			{title: "clear_cookies_title", desc: "clear_cookies_desc", type: "action", action: "remove-cookies", emoji: true, emojiChar: "🍪", keycheck: false, keys: ['⌘', 'D']},
			{title: "clear_cache_title", desc: "clear_cache_desc", type: "action", action: "remove-cache", emoji: true, emojiChar: "🗄", keycheck: false, keys: ['⌘', 'D']},
			{title: "clear_local_storage_title", desc: "clear_local_storage_desc", type: "action", action: "remove-local-storage", emoji: true, emojiChar: "📦", keycheck: false, keys: ['⌘', 'D']},
			{title: "clear_passwords_title", desc: "clear_passwords_desc", type: "action", action: "remove-passwords", emoji: true, emojiChar: "🔑", keycheck: false, keys: ['⌘', 'D']},
		];

		if (!isMac) {
			for (action of actions) {
				switch (action.action) {
					case "reload":
						action.keys = ['F5'];
						break;
					case "fullscreen":
						action.keys = ['F11'];
						break;
					case "downloads":
						action.keys = ['Ctrl', 'J'];
						break;
					case "settings":
						action.keycheck = false;
						break;
					case "history":
						action.keys = ['Ctrl', 'H'];
						break;
					case "go-back":
						action.keys = ['Alt','←'];
						break;
					case "go-forward":
						action.keys = ['Alt','→']
						break;
					case "scroll-top":
						action.keys = ['Home'];
						break;
					case "scroll-bottom":
						action.keys = ['End'];
						break;
				}
				for (const key in action.keys) {
					if (action.keys[key] === "⌘") {
						action.keys[key] = "Ctrl";
					} else if (action.keys[key] === "⌥") {
						action.keys[key] = "Alt";
					}
				};
			};
		}
	});
}

// Open on install
chrome.runtime.onInstalled.addListener((object) => {
  // Inject Omni on install
  const manifest = chrome.runtime.getManifest();

  const injectIntoTab = (tab) => {
    const scripts = manifest.content_scripts[0].js;
    const s = scripts.length;

    for (let i = 0; i < s; i++) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [scripts[i]],
      });
    }

    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: [manifest.content_scripts[0].css[0]],
    });
  };

  // Get all windows
  chrome.windows.getAll(
    {
      populate: true,
    },
    (windows) => {
      let currentWindow;
      const w = windows.length;

      for (let i = 0; i < w; i++) {
        currentWindow = windows[i];

        let currentTab;
        const t = currentWindow.tabs.length;

        for (let j = 0; j < t; j++) {
          currentTab = currentWindow.tabs[j];
					if (!currentTab.url.includes("chrome://") && !currentTab.url.includes("chrome-extension://") && !currentTab.url.includes("chrome.google.com")) {
          	injectIntoTab(currentTab);
					}
        }
      }
    }
  );

  if (object.reason === "install") {
    chrome.tabs.create({ url: "https://alyssax.com/omni/" });
  }
});

// Check when the extension button is clicked
chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, {request: "open-omni"});
});

// Listen for the open omni shortcut
chrome.commands.onCommand.addListener((command) => {
	if (command === "open-omni") {
		getCurrentTab().then((response) => {
			if (!response.url.includes("chrome://") && !response.url.includes("chrome.google.com")) {
				chrome.tabs.sendMessage(response.id, {request: "open-omni"});
			} else {
				chrome.tabs.create({
					url: "./newtab.html"	
				}).then(() => {
					newtaburl = response.url;
					chrome.tabs.remove(response.id);
				})
			}
		});
	}
});

// Get the current tab
const getCurrentTab = async () => {
	const queryOptions = { active: true, currentWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

// Restore the new tab page (workaround to show Omni in new tab page)
function restoreNewTab() {
	getCurrentTab().then((response) => {
		chrome.tabs.create({
			url: newtaburl
		}).then(() => {
			chrome.tabs.remove(response.id);
		})
	})
}

const resetOmni = () => {
	clearActions();
	getTabs();
	getBookmarks();
	var search = [
		{title:"query_search_title", desc:"query_search_desc", type:"action", action:"search", emoji:true, emojiChar:"🔍", keycheck:false},
		{title:"goto_search_title", desc:"goto_search_desc", type:"action", action:"goto", emoji:true, emojiChar:"🔍", keycheck:false}
	];
	actions = search.concat(actions);
}

// Check if tabs have changed and actions need to be fetched again
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => resetOmni());
chrome.tabs.onCreated.addListener((tab) => resetOmni());
chrome.tabs.onRemoved.addListener((tabId, changeInfo) => resetOmni());

// Get tabs to populate in the actions
const getTabs = () => {
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			tab.desc = "chrome_tab_desc";
			tab.keycheck = false;
			tab.action = "switch-tab";
			tab.type = "tab";
		})
		actions = tabs.concat(actions);
	});
}

// Get bookmarks to populate in the actions
const getBookmarks = () => {
	const process_bookmark = (bookmarks) => {
		for (const bookmark of bookmarks) {	
			if (bookmark.url) {
				actions.push({title: bookmark.title, desc: "specific_bookmark_desc", id:bookmark.id, url:bookmark.url, type:"bookmark", action:"bookmark", emoji:true, emojiChar:"⭐️", keycheck:false})
			}
			if (bookmark.children) {
				process_bookmark(bookmark.children);
			}
		}
	}

	chrome.bookmarks.getRecent(100, process_bookmark);
}

// Lots of different actions
const switchTab = (tab) => {
	chrome.tabs.highlight({
		tabs: tab.index,
		windowId: tab.windowId
	})
	chrome.windows.update(
		tab.windowId,
		{ focused: true }
	)
}
const goBack = (tab) => {
	chrome.tabs.goBack({
		tabs: tab.index
	})
}
const goForward = (tab) => {
	chrome.tabs.goForward({
		tabs: tab.index
	})
}
const duplicateTab = (tab) => {
	getCurrentTab().then((response) => {
		chrome.tabs.duplicate(response.id);
	})
}
const createBookmark = (tab) => {
	getCurrentTab().then((response) => {
		chrome.bookmarks.create({
			title: response.title,
			url: response.url
		});
	})
}
const muteTab = (mute) =>{
	getCurrentTab().then((response) => {
		chrome.tabs.update(response.id, {"muted": mute})
	});
}
const reloadTab = () => {
	chrome.tabs.reload();
}
const pinTab = (pin) => {
	getCurrentTab().then((response) => {
		chrome.tabs.update(response.id, {"pinned": pin})
	});
}
const clearAllData = () => {
	chrome.browsingData.remove({
		"since": (new Date()).getTime()
	}, {
		"appcache": true,
		"cache": true,
		"cacheStorage": true,
		"cookies": true,
		"downloads": true,
		"fileSystems": true,
		"formData": true,
		"history": true,
		"indexedDB": true,
		"localStorage": true,
		"passwords": true,
		"serviceWorkers": true,
		"webSQL": true
	});
}
const clearBrowsingData = () => {
	chrome.browsingData.removeHistory({"since": 0});
}
const clearCookies = () =>{
	chrome.browsingData.removeCookies({"since": 0});
}
const clearCache = () => {
	chrome.browsingData.removeCache({"since": 0});
}
const clearLocalStorage = () => {
	chrome.browsingData.removeLocalStorage({"since": 0});
}
const clearPasswords = () => {
	chrome.browsingData.removePasswords({"since": 0});
}
const openChromeUrl = (url) => {
	chrome.tabs.create({url: 'chrome://'+url+'/'});
}
const openIncognito = () => {
	chrome.windows.create({"incognito": true});
}
const closeWindow = (id) => {
	chrome.windows.remove(id);
}
const closeTab = (tab) => {
	chrome.tabs.remove(tab.id);
}
const closeCurrentTab = () => {
	getCurrentTab().then(closeTab)
}
const removeBookmark = (bookmark) => {
	chrome.bookmarks.remove(bookmark.id);
}

// Receive messages from any tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	switch (message.request) {
		case "get-actions":
			resetOmni();
			sendResponse({actions: actions});
			break;
		case "switch-tab":
			switchTab(message.tab);
			break;
		case "go-back":
			goBack(message.tab);
			break;
		case "go-forward":
			goForward(message.tab);
			break;
		case "duplicate-tab":
			duplicateTab(message.tab);
			break;
		case "create-bookmark":
			createBookmark(message.tab);
			break;
		case "mute":
			muteTab(true);
			break;
		case "unmute":
			muteTab(false);
			break;
		case "reload":
			reloadTab();
			break;
		case "pin":
			pinTab(true);
			break;
		case "unpin":
			pinTab(false);
			break;
		case "remove-all":
			clearAllData();
			break;
		case "remove-history":
			clearBrowsingData();
			break;
		case "remove-cookies":
			clearCookies();
			break;
		case "remove-cache":
			clearCache();
			break;
		case "remove-local-storage":
			clearLocalStorage();
			break;
		case "remove-passwords":
			clearPasswords();
		case "history": // Fallthrough
		case "downloads":
		case "extensions":
		case "settings":
		case "extensions/shortcuts":
			openChromeUrl(message.request);
			break;
		case "manage-data":
			openChromeUrl("settings/clearBrowserData");
			break;
		case "incognito":
			openIncognito();
			break;
		case "close-window":
			closeWindow(sender.tab.windowId);
			break;
		case "close-tab":
			closeCurrentTab();
			break;
		case "search-history":
			chrome.history.search({text:message.query, maxResults:0, startTime:0}).then((data) => {
				data.forEach((action, index) => {
					action.type = "history";
					action.emoji = true;
					action.emojiChar = "🏛";
					action.action = "history";
					action.keyCheck = false;
				});
				sendResponse({history:data});
			})
			return true;
		case "search-bookmarks":
			chrome.bookmarks.search({query:message.query}).then((data) => {
				// The index property of the bookmark appears to be causing issues, iterating separately...
				data.filter(x => x.index == 0).forEach((action, index) => {
					if (!action.url) {
						data.splice(index, 1);
					}
					action.type = "bookmark";
					action.emoji = true;
					action.emojiChar = "⭐️";
					action.action = "bookmark";
					action.keyCheck = false;
				})
				data.forEach((action, index) => {
					if (!action.url) {
						data.splice(index, 1);
					}
					action.type = "bookmark";
					action.emoji = true;
					action.emojiChar = "⭐️";
					action.action = "bookmark";
					action.keyCheck = false;
				})
				sendResponse({bookmarks:data});
			})
			return true;
		case "remove":
			if (message.type == "bookmark") {
				removeBookmark(message.action);
			} else {
				closeTab(message.action);
			}
			break;
		case "search":
			chrome.search.query(
				{disposition: "NEW_TAB", text:message.query}
			)
			break;
		case "restore-new-tab":
			restoreNewTab();
			break;
		case "close-omni":
			getCurrentTab().then((response) => {
				chrome.tabs.sendMessage(response.id, {request: "close-omni"});
			});
			break;
		}
});

// Get actions
resetOmni();
