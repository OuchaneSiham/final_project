# Profile Component Architecture - Mobile-First Responsive Design

## Overview
This document outlines the structure and functions needed for a responsive Profile component that prioritizes mobile design and scales up to desktop views.

---

## Component Hierarchy

```
ProfileContainer (Main Parent Component)
├── ProfileHeader
│   ├── ProfileAvatar
│   ├── ProfileName
│   └── ProfileActions (Edit/Settings Button)
├── ProfileStats
│   ├── StatsCard (Games Won)
│   ├── StatsCard (Win Rate)
│   └── StatsCard (Level/Ranking)
├── ProfileTabs
│   ├── AboutTab
│   ├── FriendsTab
│   └── MatchHistoryTab
├── ProfileContent (Dynamic based on active tab)
│   ├── AboutSection
│   │   ├── PersonalInfo (Email, Status, Bio)
│   │   └── EditForm (shown in edit mode)
│   ├── FriendsSection
│   │   ├── FriendsList
│   │   ├── PendingRequests
│   │   └── SearchFriends
│   └── MatchHistorySection
│       └── MatchList
└── BottomNav (Mobile only)
    └── NavigationItems
```

---

## Core Functions & Their Purposes

### 1. **Data Fetching Functions**

#### `fetchUserData()`
- **Purpose**: Retrieve current user profile information
- **Returns**: User object with name, avatar, email, bio, statistics
- **Help**: Foundation for displaying all profile information
- **Triggers**: Component mount, after update

#### `fetchFriendsData()`
- **Purpose**: Get list of all confirmed friends
- **Returns**: Array of friend objects with basic info
- **Help**: Populates Friends tab with connected users
- **Triggers**: Tab switch to Friends, component mount

#### `fetchPendingRequests()`
- **Purpose**: Get list of pending friend requests (both sent & received)
- **Returns**: Array of pending request objects
- **Help**: Shows users awaiting acceptance/response
- **Triggers**: Component mount, after action (accept/reject/send)

#### `fetchMatchHistory()`
- **Purpose**: Retrieve user's previous game matches
- **Returns**: Array of match objects with results, dates, opponents
- **Help**: Displays gaming history and statistics
- **Triggers**: Tab switch to Match History, pagination

#### `searchUsers(query)`
- **Purpose**: Search for users by username or email
- **Returns**: Array of found users
- **Help**: Enables friend discovery
- **Triggers**: Search input change (debounced)

---

### 2. **State Management Functions**

#### `setActiveTab(tabName)`
- **Purpose**: Switch between About, Friends, and Match History tabs
- **Returns**: Updates UI to show selected tab content
- **Help**: Manages tab navigation and content visibility
- **Triggers**: User clicks tab button

#### `toggleEditMode()`
- **Purpose**: Switch between view mode and edit mode
- **Returns**: Shows/hides edit form
- **Help**: Allows profile customization
- **Triggers**: Edit button click

#### `setSelectedFriend(friend)`
- **Purpose**: Store selected friend for detailed view
- **Returns**: Updates selected friend state
- **Help**: Enables friend profile preview or detailed view
- **Triggers**: Click on friend card

#### `handleLoadMore()`
- **Purpose**: Load additional data (pagination)
- **Returns**: Appends new items to existing list
- **Help**: Manages large lists without performance issues
- **Triggers**: Scroll to bottom or "Load More" button

---

### 3. **User Interaction Functions**

#### `handleEditProfile(formData)`
- **Purpose**: Update user profile information
- **Returns**: Updated user object, confirmation message
- **Help**: Allows users to modify their bio, status, settings
- **Triggers**: Form submission in edit mode

#### `handleSendFriendRequest(userId)`
- **Purpose**: Send friend request to another user
- **Returns**: Request confirmation, updates UI
- **Help**: Initiates friend connection
- **Triggers**: "Add Friend" button click

#### `handleAcceptRequest(requestId)`
- **Purpose**: Accept a pending friend request
- **Returns**: Updates pending requests list, adds to friends
- **Help**: Confirms friend connection
- **Triggers**: "Accept" button on pending request

#### `handleRejectRequest(requestId)`
- **Purpose**: Reject a friend request
- **Returns**: Removes from pending list
- **Help**: Decline unwanted connections
- **Triggers**: "Reject" button on pending request

#### `handleRemoveFriend(friendId)`
- **Purpose**: Remove an existing friend
- **Returns**: Updates friends list
- **Help**: Manage friend connections
- **Triggers**: "Remove" button on friend card

#### `handleFilterFriends(filterType)`
- **Purpose**: Filter friends by status (Online, Offline, Blocked)
- **Returns**: Filtered friends array
- **Help**: Quick view of specific friend groups
- **Triggers**: Filter button selection

---

### 4. **UI/UX Functions**

#### `formatUserData(rawData)`
- **Purpose**: Transform API data into UI-friendly format
- **Returns**: Formatted data object
- **Help**: Clean separation of data layer from presentation
- **Triggers**: After data fetch

#### `calculateResponsiveLayout(screenSize)`
- **Purpose**: Determine layout based on device screen width
- **Returns**: Layout config (mobile, tablet, desktop)
- **Help**: Ensures responsive design works correctly
- **Triggers**: Window resize, component mount

#### `handleResponsiveNav()`
- **Purpose**: Toggle mobile menu visibility
- **Returns**: Menu open/close state
- **Help**: Mobile navigation management
- **Triggers**: Hamburger menu click

#### `formatDate(date)`
- **Purpose**: Convert timestamps to readable format
- **Returns**: Formatted date string
- **Help**: Display user-friendly dates for matches, actions
- **Triggers**: Data display

#### `getStatusColor(status)`
- **Purpose**: Return color code based on user status
- **Returns**: Color string (green=online, gray=offline)
- **Help**: Visual indicator of friend availability
- **Triggers**: Rendering friend cards

---

### 5. **Validation & Error Handling Functions**

#### `validateFormInput(formData)`
- **Purpose**: Validate profile update form
- **Returns**: Validation errors object or null
- **Help**: Prevents invalid data submission
- **Triggers**: Before form submission

#### `handleError(errorObject)`
- **Purpose**: Process and display error messages
- **Returns**: User-friendly error message
- **Help**: Better error communication
- **Triggers**: API failures

#### `handleAuthError()`
- **Purpose**: Handle authentication failures
- **Returns**: Redirect to login
- **Help**: Manage session/token issues
- **Triggers**: 401 responses from API

---

### 6. **Socket.io Real-time Functions** (for live features)

#### `onFriendStatusChange(friendData)`
- **Purpose**: Listen for friend online/offline status changes
- **Returns**: Updates friend status in UI
- **Help**: Real-time friend availability display
- **Triggers**: Socket event from server

#### `onFriendRequestReceived(requestData)`
- **Purpose**: Listen for new incoming friend requests
- **Returns**: Adds to pending requests, shows notification
- **Help**: Live notification of friend requests
- **Triggers**: Socket event from server

#### `onMatchCompleted(matchData)`
- **Purpose**: Listen for completed match results
- **Returns**: Updates stats and match history
- **Help**: Real-time game result updates
- **Triggers**: Socket event from server

---

## Mobile-First Responsive Breakpoints

```
Mobile (< 640px)
├── Single column layout
├── Full-width cards
├── Bottom navigation bar
├── Stacked tabs
└── Touch-friendly buttons (44px minimum)

Tablet (640px - 1024px)
├── Two column layout in some sections
├── Side navigation
├── Wider spacing
└── Optimized card sizing

Desktop (> 1024px)
├── Three column layout (sidebar, main, details)
├── Horizontal navigation
├── Maximum content width
└── Advanced filtering options
```

---

## Data Flow Diagram

```
User Opens Profile
    ↓
fetchUserData() → setUserData()
fetchFriendsData() → setFriends()
fetchPendingRequests() → setPendingReqs()
    ↓
Render ProfileHeader (displays user info)
Render ProfileStats (displays achievements)
Render ProfileTabs (navigation)
    ↓
User Selects Tab
    ↓
    ├→ About Tab: Render AboutSection (fetchUserData already loaded)
    ├→ Friends Tab: Render FriendsSection (fetchFriendsData already loaded)
    └→ Match History Tab: fetchMatchHistory() → Render MatchHistorySection
    ↓
User Interaction (Edit, Add Friend, etc.)
    ↓
Handler Function Called → API Request → Update State → Re-render
```

---

## Key Features & Functions Summary

| Feature | Primary Function | Dependencies |
|---------|------------------|--------------|
| Profile Display | `fetchUserData()` | `formatUserData()` |
| Edit Profile | `handleEditProfile()` | `validateFormInput()`, `toggleEditMode()` |
| Friends List | `fetchFriendsData()` | `formatUserData()`, `getStatusColor()` |
| Friend Requests | `fetchPendingRequests()` | `handleAcceptRequest()`, `handleRejectRequest()` |
| Search Friends | `searchUsers()` | Debouncing |
| Match History | `fetchMatchHistory()` | `formatDate()` |
| Real-time Updates | Socket listeners | `onFriendStatusChange()`, `onMatchCompleted()` |
| Responsive Layout | `calculateResponsiveLayout()` | Window resize listener |
| Error Handling | `handleError()` | All API calls |

---

## Implementation Strategy

1. **Phase 1**: Create base component structure and mobile layout
2. **Phase 2**: Implement data fetching functions
3. **Phase 3**: Add user interaction handlers
4. **Phase 4**: Implement responsive breakpoints
5. **Phase 5**: Add real-time socket functionality
6. **Phase 6**: Polish and optimize performance

---

## CSS Classes & Responsive Utilities

```css
/* Mobile-first approach */
.profile-container { /* mobile default */ }
.profile-header { /* mobile default */ }
.profile-tabs { /* stack vertically */ }
.profile-content { /* full width */ }

/* Tablet breakpoint (640px) */
@media (min-width: 640px) {
  .profile-container { /* two-column */ }
}

/* Desktop breakpoint (1024px) */
@media (min-width: 1024px) {
  .profile-container { /* three-column */ }
}
```

---

## Notes
- All functions should handle loading and error states
- Implement debouncing for search functionality
- Use lazy loading for images and large lists
- Consider accessibility (keyboard navigation, ARIA labels)
- Cache data where appropriate to reduce API calls
