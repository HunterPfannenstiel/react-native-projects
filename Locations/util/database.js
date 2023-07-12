import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS place (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function insertPlace(place) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO place (title, imageUri, address, latitude, longitude)
            VALUES(?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, res) => {
          resolve(res.insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchPlaces() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM place`,
        [],
        (_, res) => {
          const places = [];
          res.rows._array.forEach((row) => {
            places.push(convertRowToPlace(row));
          });
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

export function fetchPlaceDetails(id) {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM place P WHERE P.id = ?`,
        [id],
        (_, res) => {
          resolve(convertRowToPlace(res.rows._array[0]));
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

function convertRowToPlace(row) {
  return new Place(
    row.title,
    row.imageUri,
    row.address,
    {
      longitude: row.longitude,
      latitude: row.latitude,
    },
    row.id
  );
}
