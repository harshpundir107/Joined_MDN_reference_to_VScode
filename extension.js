const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('mdn-doc-search.searchMDN', function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No active editor found');
      return;
    }

    // Get selected text OR the word under cursor
    const selection = editor.selection;
    let query = editor.document.getText(selection);

    if (!query) {
      const wordRange = editor.document.getWordRangeAtPosition(selection.active);
      if (wordRange) {
        query = editor.document.getText(wordRange);
      }
    }

    if (!query) {
      vscode.window.showWarningMessage('Please click or highlight a word to search MDN.');
      return;
    }

    // Open MDN directly in default web browser
    const mdnUrl = `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(query)}`;
    vscode.env.openExternal(vscode.Uri.parse(mdnUrl));
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;