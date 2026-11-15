// Backup and restore: the recovery log (with photos), the rehab plan and its
// ticks in one file, so they survive a new phone or cleared site data. A
// restore merges: nothing already here is deleted, and nothing is added
// twice. Needs recovery-log.js and rehab-plan.js.

var BACKUP_FORMAT = 'injury-helper-backup';
var BACKUP_VERSION = 1;

function makeBackup(entries, items, marks, now) {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    createdAt: now.getTime(),
    entries: entries.map(function (entry) {
      // Records saved before a field existed have no value for it.
      return {
        date: entry.date, text: entry.text,
        painRest: entry.painRest == null ? null : entry.painRest,
        painExercise: entry.painExercise == null ? null : entry.painExercise,
        photo: entry.photo || null, createdAt: entry.createdAt
      };
    }),
    items: items.map(function (item) { return Object.assign({}, item); }),
    done: marks.map(function (mark) { return {itemId: mark.itemId, date: mark.date}; })
  };
}

function backupFileName(today) {
  return 'injury-helper-backup-' + today + '.json';
}

function isTime(value) {
  return typeof value === 'number' && isFinite(value) && value >= 0;
}

function isBackupEntry(entry) {
  return entry !== null && typeof entry === 'object' &&
    typeof entry.date === 'string' && typeof entry.text === 'string' && isTime(entry.createdAt) &&
    (entry.photo === null || (typeof entry.photo === 'string' && entry.photo.indexOf('data:image/') === 0)) &&
    logEntryProblems(entry).length === 0;
}

function isBackupItem(item) {
  return item !== null && typeof item === 'object' && item.id !== undefined &&
    typeof item.name === 'string' && typeof item.amount === 'string' && Array.isArray(item.days) &&
    item.days.every(function (day) { return ALL_WEEKDAYS.indexOf(day) >= 0; }) &&
    typeof item.start === 'string' && typeof item.end === 'string' && isTime(item.createdAt) &&
    planItemProblems(item).length === 0;
}

// The backup in a file's text, or null if it is not one of this site's
// backups or anything in it is damaged; then nothing is restored at all.
function readBackup(text) {
  var backup;
  try { backup = JSON.parse(text); } catch (error) { return null; }
  if (backup === null || typeof backup !== 'object' || backup.format !== BACKUP_FORMAT ||
      backup.version !== BACKUP_VERSION || !isTime(backup.createdAt) ||
      !Array.isArray(backup.entries) || !Array.isArray(backup.items) || !Array.isArray(backup.done)) return null;
  if (!backup.entries.every(isBackupEntry) || !backup.items.every(isBackupItem)) return null;
  var itemIds = backup.items.map(function (item) { return item.id; });
  var marksFit = backup.done.every(function (mark) {
    return mark !== null && typeof mark === 'object' && itemIds.indexOf(mark.itemId) >= 0 &&
      typeof mark.date === 'string' && DATE_PATTERN.test(mark.date);
  });
  return marksFit ? backup : null;
}

// What makes two copies the same record or exercise, wherever they were saved.
function entryIdentity(entry) {
  return [entry.date, entry.createdAt, entry.text].join('|');
}

function itemIdentity(item) {
  return [item.createdAt, item.name, item.start].join('|');
}

// What a restore adds to what is already here: the records and exercises not
// here yet, and where each backed-up exercise's ticks belong. `existingId`
// is an exercise already here; a new one gets its id when it is saved.
function mergeBackup(backup, current) {
  var entryKeys = current.entries.map(entryIdentity);
  var entries = backup.entries.filter(function (entry) { return entryKeys.indexOf(entryIdentity(entry)) < 0; });
  var items = backup.items.map(function (item) {
    var same = current.items.filter(function (existing) { return itemIdentity(existing) === itemIdentity(item); })[0];
    return {item: item, existingId: same ? same.id : null};
  });
  return {
    entries: entries,
    items: items,
    done: backup.done,
    skipped: backup.entries.length - entries.length + items.filter(function (pair) { return pair.existingId !== null; }).length
  };
}
