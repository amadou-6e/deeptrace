import * as vscode from 'vscode';
import { ChatSidebarProvider } from './chatSidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "deeptrace" is now active.');

  // Initialisiere Sidebar
  const provider = new ChatSidebarProvider(context.extensionUri);

  // Registriere Webview Provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ChatSidebarProvider.viewType,
      provider
    )
  );

  // Registriere Command
  context.subscriptions.push(
    vscode.commands.registerCommand('deeptrace.openChat', () => {
      vscode.commands.executeCommand('workbench.view.extension.deeptrace-sidebar');
    })
  );
}

export function deactivate() {}