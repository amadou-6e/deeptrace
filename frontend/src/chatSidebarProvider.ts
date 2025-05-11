import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class ChatSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'deeptrace.openChat';
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, 'out'),
      ]
    };
    console.log('Loading sidebar HTML...');
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const outPath = path.join(this._extensionUri.fsPath, 'out', 'index.html');
    let html = fs.readFileSync(outPath, 'utf8');

    // Dynamisch Resource-URIs ersetzen
    html = html.replace(
      /\/assets\//g,
      `${webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'out', 'assets'))}/`
    );

    return html;
  }
}