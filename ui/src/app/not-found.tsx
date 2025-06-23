// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1>404 - ページが見つかりません</h1>
      <p>お探しのページは存在しないか、移動された可能性があります。</p>
      <Link href="/">
        <button style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          ホームに戻る
        </button>
      </Link>
    </div>
  )
}