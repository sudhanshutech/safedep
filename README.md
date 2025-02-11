# SafeDep Visual Insights for an OSS package
![safedep-recording (1)](https://github.com/user-attachments/assets/9086174f-3ad9-4ffe-8e75-ea4d06d19984)


## 🌟 Features
- **Dependency Visualization**: Interactive hierarchical graph showing package relationships  
- **Vulnerability Tracking**: CVE severity analysis with upgrade recommendations  
- **Project Health Dashboard**: Scorecard metrics + GitHub statistics visualization  
- **License Compliance**: License type detection and compatibility checks  
- **Version Comparison**: Side-by-side analysis of different package versions  

## 🚀 Quick Start

### Prerequisites
- Node.js v18+  
- react 18  

### Installation
```bash
git clone https://github.com/yourusername/safedep.git
npm install
```

## Tech stack 
1. **Framework**: NextJs
2. **UI Library**: Shadcn, Tailwind
3. **Charts**: recharts
4. **Testing(end-to-end)**: Playwright

<hr/>

### Point to note
>[!NOTE]
>Currently the data used for visual insight is used by mock data retrieved from ```sampledata.json```. The safedep insights api is setup properly using server side rendering in page directory.
Due to disallowed access to the api its been commented out. But that can be used instead of mock data when we will hit the api.
