        <aside className="w-80 bg-gray-800 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-6">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700 hover:text-white">
                All meetings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700 hover:text-white">
                Upcoming
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700 hover:text-white">
                Recent
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700 hover:text-white">
                Archived
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-900">
          {!currentMeeting ? (
            <>
              {/* File Upload Section */}
              <section className="mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold mb-4 text-white">Upload Audio File</h2>
                  <div className="flex items-center space-x-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={processingStatus?.status === 'uploading' || processingStatus?.status === 'processing'}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Audio File
                    </Button>
                    {uploadedFile && (
                      <span className="text-gray-400">{uploadedFile.name}</span>
                    )}
                  </div>
                  
                  {processingStatus && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">