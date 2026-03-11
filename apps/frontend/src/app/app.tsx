import {SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter} from '@my-drive-v2/ui'

export function App() {
  return (
    <SidebarProvider>

      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}

export default App;
