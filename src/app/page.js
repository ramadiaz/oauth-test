'use client'
import React, { useEffect, useState } from 'react'
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import { Copy, CheckCircle, Info, Key, Clock, Shield, User } from 'lucide-react'

const Page = () => {
  const [clientId, setClientId] = useState("YOUR_GOOGLE_CLIENT_ID")
  const [tokenResponse, setTokenResponse] = useState(null)
  const [currentHost, setCurrentHost] = useState("")

  useEffect(() => {
    setCurrentHost(window.location.host)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-14">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Google OAuth Tester</h1>
          <p className="text-gray-600 text-lg">Test your Google OAuth integration with ease</p>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-start space-x-3 mb-4">
            <Info className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use This OAuth Tester</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">1</span>
                  <p><strong>Get your Google Client ID:</strong> Go to the <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a> → Create/Select Project → APIs & Services → Credentials</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">2</span>
                  <p><strong>Configure OAuth:</strong> Create OAuth 2.0 Client ID → Web application → Add authorized origins (e.g., {currentHost})</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">3</span>
                  <p><strong>Enter Client ID:</strong> Paste your Client ID in the input field below</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">4</span>
                  <p><strong>Test Login:</strong> Click &quot;Sign in with Google&quot; and view the token response</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GoogleOAuthProvider clientId={clientId}>
          {/* Configuration Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2 text-indigo-500" />
              Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                  Google Client ID
                </label>
                <input
                  id="clientId"
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Enter your Google Client ID (e.g., 123456789-abc123.apps.googleusercontent.com)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <LoginButton setTokenResponse={setTokenResponse} />
            </div>
          </div>

          {/* Token Response Card */}
          {tokenResponse && (
            <TokenDisplay tokenResponse={tokenResponse} />
          )}
        </GoogleOAuthProvider>
      </div>
    </div>
  )
}

const LoginButton = ({ setTokenResponse }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(false)
      setTokenResponse(tokenResponse)
      console.log({ tokenResponse })
    },
    onError: (error) => {
      setIsLoading(false)
      console.error("Google OAuth error:", error)
      setTokenResponse({ error: error.toString() })
    }
  })

  const handleClick = () => {
    setIsLoading(true)
    handleLogin()
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <User className="w-5 h-5" />
          <span>Sign in with Google</span>
        </>
      )}
    </button>
  )
}

const TokenDisplay = ({ tokenResponse }) => {
  const [copiedItems, setCopiedItems] = useState({})

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const CopyButton = ({ text, itemKey }) => (
    <button
      onClick={() => copyToClipboard(text, itemKey)}
      className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors flex-shrink-0"
      title="Copy to clipboard"
    >
      {copiedItems[itemKey] ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700" />
      )}
    </button>
  )

  const getTokenIcon = (key) => {
    switch (key) {
      case 'access_token': return <Key className="w-4 h-4 text-green-500" />
      case 'expires_in': return <Clock className="w-4 h-4 text-orange-500" />
      case 'scope': return <Shield className="w-4 h-4 text-blue-500" />
      default: return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-green-500" />
        Token Response
      </h2>

      {tokenResponse.error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-red-400 mr-3">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Authentication Error</h3>
              <p className="text-red-600 mt-1">{tokenResponse.error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(tokenResponse).map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getTokenIcon(key)}
                  <span className="font-medium text-gray-900 ml-2 capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                </div>
                <CopyButton text={value.toString()} itemKey={key} />
              </div>
              <div className="font-mono text-sm text-gray-700 bg-white p-3 rounded border break-all">
                {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
              </div>
              {key === 'expires_in' && (
                <p className="text-xs text-gray-500 mt-1">
                  Token expires in {value} seconds ({Math.round(value / 60)} minutes)
                </p>
              )}
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">💡 Next Steps</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use the <strong>access_token</strong> to make authenticated API calls</li>
              <li>• Check the <strong>expires_in</strong> value to know when to refresh the token</li>
              <li>• The <strong>scope</strong> shows what permissions were granted</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page