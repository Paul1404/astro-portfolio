# Web GitOps diagrams

The English/German Mermaid sources explain release delivery and CMS application
rollback. They describe the controller's scope and failure boundaries, not an
instruction to change infrastructure. Runtime secrets and private repository
URLs must not appear in these assets.

Regenerate the committed SVGs with `npm run diagrams:gitops`. The shared renderer,
pinned Mermaid CLI and local browser requirements are documented in
`../pdcd-mail/README.md`. The normal site build serves static SVGs without
executing Mermaid in the visitor's browser. Keep titles, descriptions, both
language versions and page image dimensions aligned after regeneration.
