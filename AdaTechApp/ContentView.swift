import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }
            
            DepartmentsView()
                .tabItem {
                    Label("Departments", systemImage: "building.2")
                }
            
            AboutView()
                .tabItem {
                    Label("About", systemImage: "info.circle")
                }
            
            ContactView()
                .tabItem {
                    Label("Contact", systemImage: "envelope")
                }
        }
    }
}

struct HomeView: View {
    @State private var currentPage = 0
    let timer = Timer.publish(every: 3, on: .main, in: .common).autoconnect()
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Hero Section
                TabView(selection: $currentPage) {
                    ForEach(0..<3) { index in
                        Image("hero\(index + 1)")
                            .resizable()
                            .scaledToFill()
                            .tag(index)
                    }
                }
                .tabViewStyle(PageTabViewStyle())
                .frame(height: 200)
                .onReceive(timer) { _ in
                    withAnimation {
                        currentPage = (currentPage + 1) % 3
                    }
                }
                
                // Stats Section
                LazyVGrid(columns: [
                    GridItem(.flexible()),
                    GridItem(.flexible())
                ], spacing: 16) {
                    StatCard(number: "1000+", label: "Students")
                    StatCard(number: "50+", label: "Teachers")
                    StatCard(number: "95%", label: "Success Rate")
                    StatCard(number: "30+", label: "Years")
                }
                .padding()
                
                // Mission Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Our Mission")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    Text("To equip learners with requisite skills...")
                        .foregroundColor(.secondary)
                }
                .padding()
                .background(Color(.systemBackground))
                .cornerRadius(10)
                .shadow(radius: 5)
                .padding(.horizontal)
                
                // Add more sections...
            }
        }
        .navigationTitle("Ada Technical School")
    }
}

struct StatCard: View {
    let number: String
    let label: String
    
    var body: some View {
        VStack {
            Text(number)
                .font(.title)
                .fontWeight(.bold)
            Text(label)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(10)
        .shadow(radius: 5)
    }
} 