'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, workspace, Uri, window, TextDocument } from 'vscode';

import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {


    context.subscriptions.push(commands.registerCommand('extension.openTemplateFile', () => {
        workspace.openTextDocument(createUri('html')).then((td: TextDocument) => {
            window.showTextDocument(td);
        });
    }));
    context.subscriptions.push(commands.registerCommand('extension.openComponentFile', () => {
        workspace.openTextDocument(createUri('ts')).then((td: TextDocument) => {
            window.showTextDocument(td);
        });
    }));
    context.subscriptions.push(commands.registerCommand('extension.openStyleFile', () => {
        workspace.openTextDocument(createUri('scss')).then((td: TextDocument) => {
            window.showTextDocument(td);
        });
    }));
}

/**
 * open component file by suffix
 *
 * @param suffix
 */
function createUri (suffix: string): Uri {

    const currentFileFsPathFragment = window.activeTextEditor.document.uri.fsPath.split('/');

    const currentFileName = currentFileFsPathFragment.pop();

    const fileNameFragment = currentFileName.split('.');

    fileNameFragment.pop();

    fileNameFragment.push(suffix);

    const fileName = fileNameFragment.join('.');

    currentFileFsPathFragment.push(fileName);

    const filePath = currentFileFsPathFragment.join('/');

    return Uri.file(filePath);
}
