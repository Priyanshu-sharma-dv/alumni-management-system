import React, { useState } from "react";
import Icon from "@/Component/AppIcon";
import Button from "@/Component/ui/Button";
import Input from "@/Component/ui/Input";

const SavedSearches = ({
  savedSearches = [],
  onLoadSearch,
  onDeleteSearch,
  onSaveCurrentSearch,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState("");

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      onSaveCurrentSearch(searchName.trim());
      setSearchName("");
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Saved Searches</h3>
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            {savedSearches.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowSaveDialog(true)}
          >
            Save Current
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="space-y-3">
            <label className="block text-sm font-medium mb-1">Search Name</label>
            <Input
              type="text"
              placeholder="Enter a name for this search..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              required
            />
            <div className="flex items-center space-x-2 mt-2">
              <Button
                variant="default"
                size="sm"
                iconName="Save"
                iconPosition="left"
                onClick={handleSaveSearch}
                disabled={!searchName.trim()}
              >
                Save Search
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSaveDialog(false);
                  setSearchName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches List */}
      {isExpanded && (
        <div className="p-4">
          {savedSearches.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No Saved Searches</h4>
              <p className="text-sm text-muted-foreground">
                Save your frequently used search filters for quick access
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">{search.name}</h4>
                      {search.isDefault && (
                        <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          Default
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{search.resultCount} results</span>
                      <span>Saved {search.savedDate}</span>
                      <span>Used {search.usageCount} times</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Play"
                      onClick={() => onLoadSearch(search)}
                      title="Load Search"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDeleteSearch(search.id)}
                      title="Delete Search"
                      className="text-destructive hover:text-destructive"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;
