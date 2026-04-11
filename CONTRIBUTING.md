# Contributing to oux.ai

Thank you for your interest in contributing to oux.ai! We welcome community contributions to help make this the best Open Source UX auditing platform.

## Code of Conduct

Please be respectful and considerate of others when interacting with this repository.

## Development Workflow

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Follow the tech stack rules in `README.md`.
4. Submit a Pull Request.

## Stack Requirements

- **Backend (Python AI):** Ensure provider agnostic implementation. Put any provider specific logic in a new file within the `providers` directory.
- **Backend (Java Core):** Use Data Transfer Objects (DTOs) with `record` and encapsulate business logic in the `service` layer.
- **Frontend (React Client):** Stick to Tailwind CSS and ensure components do not assume a specific AI provider's capabilities.
