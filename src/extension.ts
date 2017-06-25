'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, workspace, Uri, window } from 'vscode';

import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(commands.registerCommand('extension.openTemplateFile', async () => {
        commands.executeCommand('vscode.open', createUri('html'));
    }));
    context.subscriptions.push(commands.registerCommand('extension.openComponentFile', async () => {
        commands.executeCommand('vscode.open', createUri('ts'));
    }));
    context.subscriptions.push(commands.registerCommand('extension.openStyleFile', async () => {
        commands.executeCommand('vscode.open', createUri('scss'));
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
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
