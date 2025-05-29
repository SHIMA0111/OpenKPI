package source

import "github.com/go-gota/gota/dataframe"

type Source interface {
	Fetch() (*dataframe.DataFrame, error)
}
