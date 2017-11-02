package fi.vm.yti.groupmanagement.util;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public final class CollectionUtil {

    public static <T> @NotNull T requireSingle(@NotNull Collection<T> items) {

        if (items.size() != 1) {
            throw new RuntimeException("Expecting single item, was: " + items.size());
        }

        return items.iterator().next();
    }

    public static @Nullable <T> T requireSingleOrNone(@NotNull Collection<T> items) {

        if (items.size() > 1) {
            throw new RuntimeException("Expecting single item, was: " + items.size());
        }

        Iterator<T> iterator = items.iterator();

        if (iterator.hasNext()) {
            return iterator.next();
        } else {
            return null;
        }
    }

    public static <T, R> @NotNull List<R> mapToList(@NotNull Collection<T> collection, Function<T, R> mapper) {
        return collection.stream().map(mapper).collect(Collectors.toList());
    }

    public static <T> @NotNull List<T> filterToList(@NotNull Collection<T> collection, Predicate<T> predicate) {
        return collection.stream().filter(predicate).collect(Collectors.toList());
    }

    private CollectionUtil() {
    }
}
