import { useState, useEffect, useRef } from 'react';
import { javascript } from '@codemirror/lang-javascript'; 
import { python } from '@codemirror/lang-python';
import { go } from '@codemirror/lang-go';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { EditorView } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';

const languageOptions = {
  python,
  javascript,
  go,
  php,
  rust,
  cpp,
};

const CodeEditor = () => {
  const [language, setLanguage] = useState<'python' | 'javascript' | 'go' | 'php' | 'rust' | 'cpp'>('python');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const editorRef = useRef<HTMLDivElement>(null); // Ref to the editor container

  useEffect(() => {
    if (editorRef.current) {
      // Initialize the CodeMirror editor
      const editor = new EditorView({
        state: EditorState.create({
          doc: '', // Initially empty document
          extensions: [
            languageOptions[language](), // Apply the language extension
            EditorView.theme({
              '&': {
                backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
              },
            }),
          ],
        }),
        parent: editorRef.current, // Attach to the DOM element
      });

      return () => {
        // Cleanup on unmount
        editor.destroy();
      };
    }
  }, [language, theme]); // Dependency array: re-run on language or theme change

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ padding: '10px' }}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle Theme
        </button>
        <div>
          {['python', 'javascript', 'go', 'php', 'rust', 'cpp'].map((lang) => (
            <button key={lang} onClick={() => setLanguage(lang as any)}>
              {lang}
            </button>
          ))}
        </div>
      </div>
      {/* Ref to the div where the editor will be mounted */}
      <div ref={editorRef} style={{ width: '100%', height: '80%' }} />
    </div>
  );
};

export default CodeEditor;
