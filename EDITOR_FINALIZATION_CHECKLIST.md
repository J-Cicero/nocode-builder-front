# Editor Finalization Checklist

## 1) Objectif
Stabiliser l'éditeur no-code pour que l'utilisateur puisse:
- ajouter des composants,
- les déplacer correctement,
- les redimensionner,
- les aligner sur une même ligne,
- les modifier via le panneau de propriétés,
- sauvegarder/recharger sans perte.

---

## 2) Ce qui est déjà intégré (état actuel)

### Frontend
- Drag & drop palette -> canvas branché.
- Création de page avec `type_page` (`mobile/tablet/desktop`) branchée.
- Affichage dynamique des composants via `config.uiType` + `config.props`.
- Toolbar de composant sélectionné (delete/duplicate/move/align/resize rapide).
- Panneau propriétés lié aux dimensions (`largeur`, `hauteur`) et positions (`position_x`, `position_y`).
- Canvas en mode wrap pour autoriser plusieurs composants sur une même ligne.
- Sécurisation du reorder côté front (ids nettoyés).

### Backend
- `Page.type_page` ajouté et exposé dans les schémas API.
- Création/mise à jour page avec `type_page` supportée.
- Fix des erreurs `MissingGreenlet` sur sérialisation page/composant.
- Validation reorder renforcée.
- Conversion d'IDs reorder en UUID côté backend.

---

## 3) Risques / éléments non finalisés

| Sujet | Statut | Dépendance |
|---|---|---|
| Drag libre au pixel (x/y à la souris) | Partiel | Frontend |
| Resize via poignées visuelles sur canvas | Partiel | Frontend |
| Prévisualisation fidèle (comportement réel des formulaires) | Partiel | Frontend |
| Undo / Redo | Non fait | Frontend |
| Autosave robuste + file d'attente/retry | Partiel | Front + Backend |
| Gestion conflits multi-session | Non fait | Backend |
| Versioning (draft/published/history) | Non fait | Backend |
| Snap/grid/alignment guides | Non fait | Frontend |
| Tests E2E critiques éditeur | Non fait | Front + Backend |

---

## 4) Checklist de validation fonctionnelle (à cocher)

### A. Flux base éditeur
- [ ] Créer une page `mobile` puis recharger: la page existe toujours.
- [ ] Créer une page `tablet` puis basculer device: la page apparaît dans le bon device.
- [ ] Supprimer une page: elle disparaît après refresh.

### B. Composants
- [ ] Drop un `input`: rendu visuel correct (pas bloc générique).
- [ ] Drop un `button`: label/couleur modifiables.
- [ ] Drop deux composants et les mettre sur la même ligne (largeur < 100%).
- [ ] Supprimer un composant depuis la toolbar.
- [ ] Dupliquer un composant et vérifier persistance.

### C. Placement / dimension
- [ ] Changer largeur/hauteur dans propriétés -> effet immédiat + persistant.
- [ ] Changer alignement gauche/centre/droite -> effet visible.
- [ ] Reorder vertical (haut/bas) fonctionne sans erreur 400.

### D. Persistance
- [ ] Refresh navigateur: même position/taille/ordre.
- [ ] Changement d'onglet puis retour: état conservé.
- [ ] Aucun 500 backend pendant création/mise à jour composant.

### E. Sécurité API/Auth
- [ ] Après expiration token, refresh token relance correctement les requêtes.
- [ ] Pas de boucle d'erreurs 401 bloquante dans l'éditeur.

---

## 5) Comment diagnostiquer rapidement un bug

### Si le composant ne s'affiche pas correctement
1. Vérifier la réponse `GET /api/interface/{projectId}`.
2. Vérifier `config.uiType` et `config.props` du composant.
3. Vérifier la branche `renderComponentPreview` correspondante.

### Si un composant n'est pas sauvegardé
1. Vérifier `POST /api/interface/pages/{pageId}/composants` (status 201 attendu).
2. Vérifier payload envoyé (`type`, `config`, `ordre`, `largeur`, `hauteur`).
3. Vérifier qu'aucun 401/500 n'interrompt la chaîne.

### Si le reorder casse
1. Vérifier payload reorder (ids uniques et valides).
2. Vérifier backend retourne 200 (pas 400 UUID invalides / ids doubles).

---

## 6) Plan pour finaliser proprement (ordre recommandé)

### Phase 1 - Stabilisation (court terme)
- Finaliser drag/resize UX pour éviter les cas "figés".
- Ajouter toasts d'erreur explicites sur chaque action composant.
- Verrouiller la cohérence `uiType`/`type` sur tous les composants.

### Phase 2 - Fiabilité (moyen terme)
- Autosave contrôlé (debounce + retry + état "Saving/Saved").
- Tests E2E (Playwright/Cypress) sur les scénarios critiques ci-dessus.
- Journal d'audit simple côté backend pour les opérations d'édition.

### Phase 3 - Production-ready (avant release)
- Versioning: `draft` / `published` + rollback.
- Gestion conflits (optimistic lock/version field).
- Monitoring erreurs API et métriques éditeur.

---

## 7) Répartition Frontend / Backend

### Frontend (principal sur l'expérience éditeur)
- UX drag/drop/resize/alignement,
- rendu fidèle des composants,
- panneau propriétés,
- gestion d'état local + synchronisation API.

### Backend (principal sur cohérence et sécurité)
- validation des données,
- persistance fiable,
- intégrité des ids/pages/composants,
- auth/session,
- versioning et concurrence.

---

## 8) Définition de "Done" (minimum)
Le module éditeur est "Done" quand:
1. les scénarios A à E sont tous validés,
2. aucun 500/400 inattendu sur les endpoints éditeur en usage normal,
3. refresh/reconnexion ne cassent pas la mise en page,
4. un utilisateur peut construire une page complète sans blocage UX.
