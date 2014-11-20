
Bundler.require(:couch_watcher)

module CouchChanges
  MODELS_TO_WATCH = [
    Child,
    Incident,
    TracingRequest,
    Lookup,
    Location,
    FormSection,
    PrimeroModule,
    Agency,
    User
  ]

  class << self
    def logger
      $stdout.sync = true
      @_logger ||= Logger.new($stdout).tap {|l| l.level = Rails.configuration.couch_watcher_log_level }
    end

    def run(history_file=nil)
      EventMachine.run do
        CouchChanges::Watcher.new(MODELS_TO_WATCH, history_file).watch_for_changes
      end
    end

  end
end


CouchChanges.run ARGV[0] if __FILE__ == $0
