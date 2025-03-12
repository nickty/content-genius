# ContentGenius Architecture

This document provides a detailed overview of the ContentGenius architecture, explaining how the different components interact and the data flows through the system.

## System Architecture

ContentGenius follows a modern microservices architecture with the following main components:

```ascii
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  Next.js Frontend|     |  Python Services |     |  Node.js Services|
|                  |     |                  |     |                  |
+--------+---------+     +--------+---------+     +--------+---------+
         |                        |                        |
         |                        |                        |
         v                        v                        v
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|     Firebase     |     |   ML Models      |     |  Cloud Storage   |
|  Authentication  |     |                  |     |  (AWS & Azure)   |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
