# DataTable Component

A reusable, generic DataTable component with built-in pagination, loading states, and customizable columns.

## Features

- **Generic TypeScript Support**: Fully typed with TypeScript generics
- **Built-in Pagination**: Complete pagination UI with page numbers, navigation, and items per page selector
- **Loading States**: Built-in loading spinner and empty state handling
- **Responsive Design**: Mobile-friendly with adaptive pagination controls
- **Customizable Columns**: Flexible column configuration with custom rendering
- **Row Click Handling**: Optional row click functionality
- **Custom Styling**: Configurable CSS classes for rows and cells
- **Modular Design**: Search functionality separated for better reusability

## Basic Usage

```tsx
import DataTable, { type Column } from '@/components/ui/DataTable'
import SearchInput from '@/components/ui/SearchInput'

// Define your data type
interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

// Define columns
const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'Name',
    accessor: 'name',
  },
  {
    key: 'email',
    header: 'Email',
    accessor: 'email',
  },
  {
    key: 'status',
    header: 'Status',
    render: (user) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {user.status}
      </span>
    ),
  },
]

// Use the components
const [searchTerm, setSearchTerm] = useState('')

return (
  <>
    <SearchInput
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Search users..."
      showButton={true}
      onSubmit={(value) => {
        // Optional: Add search logic here
        console.log('Searching for:', value)
      }}
    />
    <DataTable
      data={users}
      columns={columns}
      keyExtractor={(user) => user.id.toString()}
    />
  </>
)
```

## With Pagination

```tsx
<DataTable
  data={users}
  columns={columns}
  pagination={{
    page: currentPage,
    limit: pageSize,
    pages: totalPages,
  }}
  onPaginationChange={({ page, limit }) => {
    setCurrentPage(page)
    setPageSize(limit)
  }}
  keyExtractor={(user) => user.id.toString()}
/>
```

## Column Configuration

### Basic Column with Accessor

```tsx
{
  key: 'email',
  header: 'Email Address',
  accessor: 'email',
  className: 'text-sm text-gray-600',
}
```

### Custom Rendered Column

```tsx
{
  key: 'actions',
  header: 'Actions',
  headerClassName: 'text-right',
  className: 'text-right',
  render: (item) => (
    <div className="flex justify-end space-x-2">
      <button onClick={() => edit(item)}>Edit</button>
      <button onClick={() => delete(item)}>Delete</button>
    </div>
  ),
}
```

### Function Accessor

```tsx
{
  key: 'fullName',
  header: 'Full Name',
  accessor: (user) => `${user.firstName} ${user.lastName}`,
}
```

## Props Reference

### DataTableProps<T>

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `T[]` | ✅ | Array of data items to display |
| `columns` | `Column<T>[]` | ✅ | Column configuration array |
| `keyExtractor` | `(item: T) => string \| number` | ✅ | Function to extract unique key from each item |
| `pagination` | `PaginationInfo` | ❌ | Pagination configuration |
| `onPaginationChange` | `(pagination: {page: number, limit: number}) => void` | ❌ | Pagination change handler |
| `loading` | `boolean` | ❌ | Loading state (default: false) |
| `emptyMessage` | `string` | ❌ | Message when no data (default: "No data available.") |
| `onRowClick` | `(item: T) => void` | ❌ | Row click handler |
| `rowClassName` | `string \| ((item: T) => string)` | ❌ | Custom row CSS classes |

### Column<T>

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | ✅ | Unique column identifier |
| `header` | `string` | ✅ | Column header text |
| `accessor` | `keyof T \| ((item: T) => ReactNode)` | ❌ | Property key or function to get cell value |
| `render` | `(item: T, value: unknown) => ReactNode` | ❌ | Custom cell renderer |
| `className` | `string` | ❌ | CSS classes for table cells |
| `headerClassName` | `string` | ❌ | CSS classes for header cell |
| `sortable` | `boolean` | ❌ | Whether column is sortable (future feature) |

### PaginationInfo

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `page` | `number` | ✅ | Current page number |
| `limit` | `number` | ✅ | Items per page |
| `pages` | `number` | ✅ | Total number of pages |

## SearchInput Component

The SearchInput component provides a consistent search interface that can be used with any DataTable.

### SearchInputProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | Current search value |
| `onChange` | `(value: string) => void` | ✅ | Search value change handler |
| `placeholder` | `string` | ❌ | Placeholder text (default: "Search...") |
| `className` | `string` | ❌ | Additional CSS classes |
| `onSubmit` | `(value: string) => void` | ❌ | Optional submit handler (wraps input in form) |
| `showButton` | `boolean` | ❌ | Show search button next to input (default: false) |
| `buttonText` | `string` | ❌ | Text for search button (default: "Search") |
| `loading` | `boolean` | ❌ | Show loading state on search button (default: false) |

## Advanced Examples

### With Row Click and Custom Styling

```tsx
<DataTable
  data={orders}
  columns={orderColumns}
  onRowClick={(order) => navigate(`/orders/${order.id}`)}
  rowClassName={(order) => 
    order.status === 'urgent' ? 'bg-red-50 border-red-200' : ''
  }
  keyExtractor={(order) => order.id.toString()}
/>
```

### With Loading State and Search

```tsx
const [searchTerm, setSearchTerm] = useState('')

<div className="space-y-4">
  <SearchInput
    value={searchTerm}
    onChange={setSearchTerm}
    placeholder="Search users..."
  />
  <DataTable
    data={isLoading ? [] : users}
    columns={columns}
    loading={isLoading}
    emptyMessage={searchTerm ? `No users found matching "${searchTerm}".` : "No users found"}
    keyExtractor={(user) => user.id.toString()}
  />
</div>
```

### SearchInput Examples

#### Basic Search (Auto-search on typing)

```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search by name or email..."
/>
```

#### Search with Button

```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Enter search term..."
  showButton={true}
  buttonText="Search"
  onSubmit={(value) => {
    // Perform search action
    performSearch(value)
  }}
/>
```

#### Search with Custom Button Text

```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search products..."
  showButton={true}
  buttonText="Find"
  onSubmit={handleSearch}
/>
```

#### Search with Submit Handler (Form-based)

```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  onSubmit={(value) => {
    // Perform search action on Enter key
    performSearch(value)
  }}
  placeholder="Press Enter to search..."
/>
```

#### Search with Loading State

```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search..."
  showButton={true}
  loading={isSearching}
  onSubmit={handleSearch}
/>
```

#### Custom Styling

```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  className="max-w-md"
  placeholder="Search..."
  showButton={true}
/>
```

## Styling

The component uses Tailwind CSS classes and follows the design system established in your application. All styling is customizable through the `className` and `headerClassName` props on columns, and `rowClassName` for rows.

## Integration with TanStack Query

The DataTable works seamlessly with TanStack Query and SearchInput:

```tsx
const [searchTerm, setSearchTerm] = useState('')

const { data, isLoading } = useQuery({
  queryKey: ['users', page, limit, searchTerm],
  queryFn: () => fetchUsers({ page, limit, search: searchTerm }),
})

return (
  <div className="space-y-6">
    <SearchInput
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Search users..."
      showButton={true}
      loading={isLoading}
      onSubmit={() => {
        // Optional: trigger search action
      }}
    />
    <DataTable
      data={data?.records || []}
      columns={columns}
      loading={isLoading}
      emptyMessage={searchTerm ? `No users found matching "${searchTerm}".` : "No users available."}
      pagination={data ? {
        page: data.page,
        limit: data.limit,
        pages: data.pages,
      } : undefined}
      onPaginationChange={setPagination}
      keyExtractor={(user) => user.id.toString()}
    />
  </div>
)
```
