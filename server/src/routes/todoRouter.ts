// server/src/routes/todoRoutes.ts

import { Router } from 'express';
import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion
} from '../controllers/todoController';
import protect from '../middleware/authMiddleware';

const router = Router();

// Alle To-Do-Routen sind geschützt und erfordern eine Authentifizierung
// mit einem gültigen JWT-Token.

// GET-Anfrage, um alle To-Dos des angemeldeten Benutzers abzurufen
router.get('/', protect, getTodos);

// POST-Anfrage, um ein neues To-Do zu erstellen
router.post('/', protect, addTodo);

// PUT-Anfrage, um ein To-Do zu aktualisieren (z. B. den Text oder den Status)
router.put('/:id', protect, updateTodo);

// DELETE-Anfrage, um ein To-Do zu löschen
router.delete('/:id', protect, deleteTodo);

// PUT-Anfrage, um den "completed"-Status eines To-Dos umzuschalten
router.put('/toggle/:id', protect, toggleTodoCompletion);

export default router;
